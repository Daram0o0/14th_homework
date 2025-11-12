import { useQuery } from '@apollo/client'
import {
  FetchTravelproductsDocument,
  FetchTravelproductsQuery,
  FetchTravelproductsQueryVariables,
} from 'commons/graphql/graphql'

interface UseProductsListBindingProps {
  isSoldout?: boolean
  search?: string
  page?: number
}

export default function useProductsListBinding(props?: UseProductsListBindingProps) {
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

  return {
    products: data?.fetchTravelproducts ?? [],
    loading,
    error,
    refetch,
  }
}

