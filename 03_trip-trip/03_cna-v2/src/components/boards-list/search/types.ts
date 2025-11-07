import { FetchBoardsQueryVariables } from 'commons/graphql/graphql'

export interface BoardsSearchProps {
  keyword: string
  refetch: (variables: FetchBoardsQueryVariables) => void
  setKeyword: (keyword: string) => void
}
