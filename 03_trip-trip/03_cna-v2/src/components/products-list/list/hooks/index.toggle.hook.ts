import { useMutation } from '@apollo/client'
import { MouseEvent } from 'react'
import {
  ToggleTravelproductPickDocument,
  ToggleTravelproductPickMutation,
  ToggleTravelproductPickMutationVariables,
  FetchTravelproductsDocument,
} from 'commons/graphql/graphql'

interface UseToggleTravelproductPickProps {
  refetch: () => void
  isSoldout?: boolean
  search?: string
  page?: number
}

export default function useToggleTravelproductPick(props: UseToggleTravelproductPickProps) {
  const [togglePick, { loading }] = useMutation<
    ToggleTravelproductPickMutation,
    ToggleTravelproductPickMutationVariables
  >(ToggleTravelproductPickDocument)

  const onClickToggle = async (
    event: MouseEvent<HTMLDivElement>,
    travelproductId: string
  ): Promise<{ success: boolean; newPickedCount: number | null }> => {
    event.stopPropagation() // 카드 클릭 이벤트 방지

    // 이미 로딩 중이면 중복 클릭 방지
    if (loading) {
      console.log('토글 훅: 이미 로딩 중')
      return { success: false, newPickedCount: null }
    }

    try {
      console.log('토글 훅: API 호출 시작', travelproductId)
      const result = await togglePick({
        variables: { travelproductId },
        refetchQueries: [
          {
            query: FetchTravelproductsDocument,
            variables: {
              isSoldout: props.isSoldout,
              search: props.search,
              page: props.page,
            },
          },
        ],
      })
      console.log('토글 훅: API 응답', result.data)

      // 추가로 refetch 호출하여 즉시 최신화
      await props.refetch()
      console.log('토글 훅: refetch 완료')

      // API가 성공하면 (에러가 없으면) 성공으로 간주
      // 응답값은 새로운 pickedCount
      const newPickedCount = result.data?.toggleTravelproductPick ?? null
      console.log('토글 훅: 성공, newPickedCount:', newPickedCount)
      return { success: true, newPickedCount }
    } catch (error) {
      console.error('토글 훅: 실패', error)
      return { success: false, newPickedCount: null }
    }
  }

  return {
    onClickToggle,
    isToggling: loading,
  }
}
