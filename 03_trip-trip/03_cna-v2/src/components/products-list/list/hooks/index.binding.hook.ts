import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import {
  FetchTravelproductsDocument,
  FetchTravelproductsQuery,
  FetchTravelproductsQueryVariables,
} from 'commons/graphql/graphql'
import { useProductsListContext } from '../../context/products-list.context'

interface UseProductsListBindingProps {
  isSoldout?: boolean
  search?: string
  page?: number
}

export default function useProductsListBinding(props?: UseProductsListBindingProps) {
  const { pickedCountSum } = useProductsListContext()
  const { data, loading, error, refetch } = useQuery<
    FetchTravelproductsQuery,
    FetchTravelproductsQueryVariables
  >(FetchTravelproductsDocument, {
    variables: {
      isSoldout: props?.isSoldout,
      search: props?.search,
      page: props?.page,
    },
  })

  // carousel 변동 값(pickedCountSum)에 따라 리패치
  useEffect(() => {
    refetch()
  }, [pickedCountSum, refetch])

  return {
    products: data?.fetchTravelproducts ?? [],
    loading,
    error,
    refetch,
  }
}

