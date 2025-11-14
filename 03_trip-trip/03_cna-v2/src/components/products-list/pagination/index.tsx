'use client'
import { usePagination } from './hook'
import styles from './styles.module.css'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { PaginationProps } from './types'

export default function Pagination(props: PaginationProps) {
  const { refetch, setCurrentPage, lastPage, currentPage } = props
  const { startPage, leftDisabled, rightDisabled, onClickPrevPage, onClickNextPage, onClickPage } =
    usePagination({
      refetch,
      setCurrentPage,
      lastPage,
      currentPage,
    })

  return (
    <div className={styles.pagination}>
      <KeyboardArrowLeft
        onClick={leftDisabled ? undefined : onClickPrevPage}
        className={leftDisabled ? styles.isDisabled : undefined}
      />
      <nav className={styles.paginationNav}>
        {new Array(5).fill('').map(
          (_, idx) =>
            startPage + idx <= lastPage && (
              <button
                key={startPage + idx}
                onClick={() => onClickPage(startPage + idx)}
                className={startPage + idx === currentPage ? styles.isActive : undefined}
              >
                {startPage + idx}
              </button>
            )
        )}
      </nav>
      <KeyboardArrowRight
        onClick={rightDisabled ? undefined : onClickNextPage}
        className={rightDisabled ? styles.isDisabled : undefined}
      />
    </div>
  )
}

