'use client'
import BoardsListComponent from 'components/boards-list/list'
import styles from './styles.module.css'
import Pagination from 'components/boards-list/pagination'
import { useQuery } from '@apollo/client'
import {
  FetchBoardsCountDocument,
  FetchBoardsCountQuery,
  FetchBoardsCountQueryVariables,
  FetchBoardsDocument,
  FetchBoardsQuery,
  FetchBoardsQueryVariables,
} from 'commons/graphql/graphql'
import { useState } from 'react'
import BoardsSearch from 'components/boards-list/search'
// import { useCheckTokenExpired } from 'commons/hooks/useAuthGuard'
import { withAuth } from 'commons/hocs/withAuth'

function BoardsPage() {
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { data, refetch } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(
    FetchBoardsDocument,
    { variables: { search: keyword } }
  )
  const { data: dataBoardsCount } = useQuery<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>(
    FetchBoardsCountDocument,
    { variables: { search: keyword } }
  )
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10)

  // useCheckTokenExpired()
  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <h1>트립토크 게시판</h1>
        <BoardsSearch keyword={keyword} refetch={refetch} setKeyword={setKeyword} />
        <div className={styles.boardFrame}>
          <BoardsListComponent
            data={data ?? { fetchBoards: [] }}
            dataBoardsCount={dataBoardsCount ?? { fetchBoardsCount: 0 }}
            currentPage={currentPage}
            keyword={keyword}
          />
          <Pagination
            refetch={refetch}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            lastPage={lastPage}
          />
        </div>
      </div>
    </div>
  )
}
export default withAuth(BoardsPage)
