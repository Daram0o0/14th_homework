import { useQuery } from '@apollo/client'
import {
  FetchTravelproductsOfTheBestDocument,
  FetchTravelproductsOfTheBestQuery,
  FetchTravelproductsOfTheBestQueryVariables,
} from 'commons/graphql/graphql'

export default function useCarouselBinding() {
  const { data, loading, error } = useQuery<
    FetchTravelproductsOfTheBestQuery,
    FetchTravelproductsOfTheBestQueryVariables
  >(FetchTravelproductsOfTheBestDocument)

  return {
    products: data?.fetchTravelproductsOfTheBest ?? [],
    loading,
    error,
  }
}

