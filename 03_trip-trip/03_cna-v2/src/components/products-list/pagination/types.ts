import { ApolloQueryResult } from '@apollo/client'
import {
  FetchTravelproductsQuery,
  FetchTravelproductsQueryVariables,
} from 'commons/graphql/graphql'
import { Dispatch, SetStateAction } from 'react'

export interface PaginationProps {
  refetch: (
    variables?: Partial<FetchTravelproductsQueryVariables>
  ) => Promise<ApolloQueryResult<FetchTravelproductsQuery>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  lastPage: number
  currentPage: number
}

export interface PaginationHookProps {
  refetch: (
    variables?: Partial<FetchTravelproductsQueryVariables>
  ) => Promise<ApolloQueryResult<FetchTravelproductsQuery>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  lastPage: number
}
