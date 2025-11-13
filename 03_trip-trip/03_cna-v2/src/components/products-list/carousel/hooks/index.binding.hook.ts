import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import {
  FetchTravelproductsOfTheBestDocument,
  FetchTravelproductsOfTheBestQuery,
  FetchTravelproductsOfTheBestQueryVariables,
} from 'commons/graphql/graphql'
import { useProductsListContext } from '../../context/products-list.context'

export default function useCarouselBinding() {
  const { activeTab, searchKeyword, currentPage, pickedCountSum } = useProductsListContext()
  const { data, loading, error, refetch } = useQuery<
    FetchTravelproductsOfTheBestQuery,
    FetchTravelproductsOfTheBestQueryVariables
  >(FetchTravelproductsOfTheBestDocument)

  // list 변동 값에 따라 리패치
  useEffect(() => {
    refetch()
  }, [activeTab, searchKeyword, currentPage, pickedCountSum, refetch])

  return {
    products: data?.fetchTravelproductsOfTheBest ?? [],
    loading,
    error,
    refetch: () => refetch(),
  }
}




