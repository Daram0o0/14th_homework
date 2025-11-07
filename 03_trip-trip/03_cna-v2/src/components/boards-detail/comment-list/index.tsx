'use client'
import { useQuery } from '@apollo/client'
import {
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
  FetchBoardCommentsQueryVariables,
} from 'commons/graphql/graphql'
import { CommentListProps } from './types'
import CommentListItem from '../comment-list-item'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'

export default function CommentListComponent(props: CommentListProps) {
  const PAGE_SIZE = 10
  const { data, loading, fetchMore } = useQuery<
    FetchBoardCommentsQuery,
    FetchBoardCommentsQueryVariables
  >(FetchBoardCommentsDocument, {
    variables: { boardId: props.boardId, page: 1 },
  })
  const reverse = data?.fetchBoardComments.toReversed()
  const [hasMore, setHasMore] = useState(true)

  if (loading) return <div>로딩 중 입니다</div>
  if (data?.fetchBoardComments?.length === 0)
    return <div style={{ color: '#777' }}>등록된 댓글이 없습니다.</div>

  const onNext = async () => {
    if (!data) return

    await fetchMore({
      variables: {
        page: Math.ceil((data.fetchBoardComments.length ?? PAGE_SIZE) / PAGE_SIZE) + 1,
        boardId: props.boardId,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        const incoming = fetchMoreResult.fetchBoardComments ?? []
        if (incoming.length === 0) {
          setHasMore(false)
          return prev
        }

        return {
          fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments],
        }
      },
    })
  }

  return (
    <div style={{ width: '100%' }}>
      <InfiniteScroll
        dataLength={data?.fetchBoardComments?.length ?? 0}
        hasMore={hasMore}
        next={onNext}
        style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
        loader={<div>로딩 중입니다</div>}
      >
        {reverse?.map((el) => (
          <CommentListItem el={el} boardId={props.boardId} key={el._id} />
        ))}
      </InfiniteScroll>
    </div>
  )
}
