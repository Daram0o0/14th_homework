'use client'
import BoardDetailPage from 'components/boards-detail/detail'
import styles from './styles.module.css'
import CommentWriteComponent from 'components/boards-detail/comment-write'
import CommentListComponent from 'components/boards-detail/comment-list'
import { useParams } from 'next/navigation'

function BoardsDetailPage() {
  const params = useParams()
  const boardId = typeof params.boardId === 'string' ? params.boardId : ''
  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <BoardDetailPage />
        <CommentWriteComponent boardId={boardId} />
        <CommentListComponent boardId={boardId} />
      </div>
    </div>
  )
}

export default BoardsDetailPage
