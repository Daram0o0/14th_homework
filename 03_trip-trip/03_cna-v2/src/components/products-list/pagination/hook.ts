import { useState } from 'react'
import { PaginationHookProps } from './types'

export const usePagination = (props: PaginationHookProps) => {
  const { refetch, setCurrentPage, lastPage } = props
  const PAGE_GROUP_SIZE = 5

  const [startPage, setStartPage] = useState(1)
  const [leftDisabled, setLeftDisabled] = useState(true)
  const [rightDisabled, setRightDisabled] = useState(false)

  const onClickPrevPage = () => {
    if (startPage === 1) return

    const newStartPage = startPage - PAGE_GROUP_SIZE
    setStartPage(newStartPage)

    refetch({
      page: newStartPage,
    })
    setCurrentPage(newStartPage)

    if (newStartPage <= 1) {
      setLeftDisabled(true)
    }
    if (newStartPage + PAGE_GROUP_SIZE <= lastPage) {
      setRightDisabled(false)
    }
  }

  const onClickNextPage = () => {
    if (startPage + PAGE_GROUP_SIZE > lastPage) return

    const newStartPage = startPage + PAGE_GROUP_SIZE
    setStartPage(newStartPage)

    refetch({
      page: newStartPage,
    })
    setCurrentPage(newStartPage)

    if (newStartPage >= 6) {
      setLeftDisabled(false)
    }
    if (newStartPage + PAGE_GROUP_SIZE > lastPage) {
      setRightDisabled(true)
    }
  }

  const onClickPage = (page: number) => {
    refetch({
      page,
    })
    setCurrentPage(page)

    // 현재 페이지가 속한 그룹의 시작 페이지 업데이트
    const groupStart = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1
    if (groupStart !== startPage) {
      setStartPage(groupStart)
    }

    // 화살표 활성화 상태 업데이트
    if (groupStart <= 1) {
      setLeftDisabled(true)
    } else {
      setLeftDisabled(false)
    }

    if (groupStart + PAGE_GROUP_SIZE > lastPage) {
      setRightDisabled(true)
    } else {
      setRightDisabled(false)
    }
  }

  return {
    startPage,
    leftDisabled,
    rightDisabled,
    onClickPrevPage,
    onClickNextPage,
    onClickPage,
  }
}
