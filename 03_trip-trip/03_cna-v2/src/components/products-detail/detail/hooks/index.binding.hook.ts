import { useQuery, useMutation } from '@apollo/client'
import { useParams, useRouter } from 'next/navigation'
import { MouseEvent, useEffect, useState } from 'react'
import { useAuth } from 'commons/providers/auth/auth.provider'
import { useProductsListContext } from 'components/products-list/context/products-list.context'
import {
  FetchTravelproductDocument,
  FetchTravelproductQuery,
  FetchTravelproductQueryVariables,
  ToggleTravelproductPickDocument,
  ToggleTravelproductPickMutation,
  ToggleTravelproductPickMutationVariables,
  FetchTravelproductsIPickedDocument,
  FetchTravelproductsIPickedQuery,
  FetchTravelproductsIPickedQueryVariables,
  DeleteTravelproductDocument,
  DeleteTravelproductMutation,
  DeleteTravelproductMutationVariables,
  FetchUserLoggedInDocument,
  FetchUserLoggedInQuery,
  FetchUserLoggedInQueryVariables,
} from 'commons/graphql/graphql'

export default function useProductsDetailBinding() {
  const params = useParams<{ productId: string }>()
  const travelproductId = params?.productId
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { pickedProductIds, togglePickedProduct } = useProductsListContext()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // fetchTravelproduct API 호출
  const { data, loading, error } = useQuery<
    FetchTravelproductQuery,
    FetchTravelproductQueryVariables
  >(FetchTravelproductDocument, {
    variables: {
      travelproductId: travelproductId || '',
    },
    skip: !travelproductId,
  })

  // 로그인된 사용자가 pick한 상품 목록 가져오기
  const { data: pickedProductsData } = useQuery<
    FetchTravelproductsIPickedQuery,
    FetchTravelproductsIPickedQueryVariables
  >(FetchTravelproductsIPickedDocument, {
    skip: !isAuthenticated, // 로그인되지 않았으면 쿼리 실행 안 함
  })

  // 현재 로그인된 사용자 정보 가져오기
  const { data: currentUserData } = useQuery<
    FetchUserLoggedInQuery,
    FetchUserLoggedInQueryVariables
  >(FetchUserLoggedInDocument, {
    skip: !isAuthenticated, // 로그인되지 않았으면 쿼리 실행 안 함
  })

  // products가 로드된 후 로그인된 사용자가 pick한 상품 목록과 동기화
  useEffect(() => {
    if (
      isAuthenticated &&
      pickedProductsData?.fetchTravelproductsIPicked &&
      data?.fetchTravelproduct
    ) {
      const currentProductId = data.fetchTravelproduct._id
      const allPickedProductIds = new Set(
        pickedProductsData.fetchTravelproductsIPicked.map((product) => product._id)
      )

      // 현재 상품이 pick된 상품 목록에 있으면 Context에 추가
      if (allPickedProductIds.has(currentProductId)) {
        togglePickedProduct(currentProductId, true)
      }
    } else if (!isAuthenticated) {
      // 로그인되지 않은 경우 빈 상태로 유지
    }
  }, [data, isAuthenticated, pickedProductsData, togglePickedProduct])

  // toggleTravelproductPick mutation
  const [togglePick, { loading: isToggling }] = useMutation<
    ToggleTravelproductPickMutation,
    ToggleTravelproductPickMutationVariables
  >(ToggleTravelproductPickDocument)

  // deleteTravelproduct mutation
  const [deleteTravelproduct, { loading: isDeleting }] = useMutation<
    DeleteTravelproductMutation,
    DeleteTravelproductMutationVariables
  >(DeleteTravelproductDocument)

  const handleToggle = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!travelproductId || isToggling) return

    try {
      await togglePick({
        variables: { travelproductId },
        update: (cache, { data: mutationData }) => {
          if (!mutationData?.toggleTravelproductPick) return

          const newPickedCount = mutationData.toggleTravelproductPick

          // fetchTravelproduct 쿼리 캐시 업데이트
          try {
            cache.modify({
              id: cache.identify({
                __typename: 'Travelproduct',
                _id: travelproductId,
              }),
              fields: {
                pickedCount() {
                  return newPickedCount
                },
              },
            })
          } catch (error) {
            console.error('캐시 업데이트 실패:', error)
          }

          // fetchTravelproduct 쿼리 캐시 업데이트
          try {
            const existingData = cache.readQuery<FetchTravelproductQuery>({
              query: FetchTravelproductDocument,
              variables: {
                travelproductId,
              },
            })

            if (existingData) {
              cache.writeQuery({
                query: FetchTravelproductDocument,
                variables: {
                  travelproductId,
                },
                data: {
                  fetchTravelproduct: {
                    ...existingData.fetchTravelproduct,
                    pickedCount: newPickedCount,
                  },
                },
              })
            }
          } catch (error) {
            console.error('fetchTravelproduct 캐시 업데이트 실패:', error)
          }
        },
        refetchQueries: [
          {
            query: FetchTravelproductDocument,
            variables: {
              travelproductId,
            },
          },
        ],
      })

      // 추가로 refetch 호출하여 즉시 최신화
      // await refetch()

      // Context 업데이트
      const isCurrentlyPicked = pickedProductIds.has(travelproductId)
      togglePickedProduct(travelproductId, !isCurrentlyPicked)
    } catch (error) {
      console.error('토글 실패:', error)
    }
  }

  // 링크 복사 기능
  const handleCopyLink = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!travelproductId) return

    try {
      const currentUrl = `${window.location.origin}/products/${travelproductId}`
      await navigator.clipboard.writeText(currentUrl)
      alert('링크가 복사되었습니다!')
    } catch (error) {
      console.error('링크 복사 실패:', error)
      alert('링크 복사에 실패했습니다.')
    }
  }

  // 삭제 기능
  const handleDelete = async () => {
    if (!travelproductId || isDeleting) return

    try {
      await deleteTravelproduct({
        variables: { travelproductId },
      })
      alert('상품이 삭제되었습니다.')
      router.push('/products')
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제에 실패했습니다.')
    }
  }

  // 삭제 모달 열기
  const handleOpenDeleteModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDeleteModalOpen(true)
  }

  // 삭제 모달 닫기
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  // 삭제 확인
  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false)
    handleDelete()
  }

  const product = data?.fetchTravelproduct
  const isPicked = product ? pickedProductIds.has(product._id) : false
  const currentUser = currentUserData?.fetchUserLoggedIn

  // 현재 사용자가 판매자인지 확인
  const isOwner = product && currentUser && product.seller?._id === currentUser._id

  return {
    product,
    loading,
    error,
    isPicked,
    isToggling,
    isDeleting,
    isDeleteModalOpen,
    isOwner,
    handleToggle,
    handleCopyLink,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
    isAuthenticated,
  }
}
