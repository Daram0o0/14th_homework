import { useState, useEffect } from 'react'
import { PaginationHookProps } from './types'

export const usePagination = (props: PaginationHookProps) => {
  const { refetch, setCurrentPage, lastPage, currentPage } = props
  const PAGE_GROUP_SIZE = 5

  // currentPage를 기반으로 초기 startPage 계산
  const initialStartPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1
  const [startPage, setStartPage] = useState(initialStartPage)
  const [leftDisabled, setLeftDisabled] = useState(currentPage <= 1)
  const [rightDisabled, setRightDisabled] = useState(currentPage >= lastPage)

  // currentPage가 변경될 때 startPage와 disabled 상태 업데이트
  useEffect(() => {
    const newStartPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1
    setStartPage(newStartPage)
    setLeftDisabled(currentPage <= 1)
    setRightDisabled(currentPage >= lastPage)
  }, [currentPage, lastPage, PAGE_GROUP_SIZE])

  const onClickPrevPage = () => {
    if (currentPage <= 1 || leftDisabled) return

    const newPage = currentPage - 1
    refetch({
      page: newPage,
    })
    setCurrentPage(newPage)

    // startPage 업데이트 (필요한 경우)
    const newStartPage = Math.floor((newPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1
    if (newStartPage !== startPage) {
      setStartPage(newStartPage)
    }

    // 상태 업데이트
    setLeftDisabled(newPage <= 1)
    setRightDisabled(newPage >= lastPage)
  }

  const onClickNextPage = () => {
    if (currentPage >= lastPage || rightDisabled) return

    const newPage = currentPage + 1
    refetch({
      page: newPage,
    })
    setCurrentPage(newPage)

    // startPage 업데이트 (필요한 경우)
    const newStartPage = Math.floor((newPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1
    if (newStartPage !== startPage) {
      setStartPage(newStartPage)
    }

    // 상태 업데이트
    setLeftDisabled(newPage <= 1)
    setRightDisabled(newPage >= lastPage)
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

    // 화살표 활성화 상태 업데이트 (현재 페이지 기준)
    setLeftDisabled(page <= 1)
    setRightDisabled(page >= lastPage)
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
