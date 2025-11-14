'use client'
import { DatePicker } from 'antd'
import styles from './styles.module.css'
import {
  Search,
  CalendarToday,
  PersonOutline,
  ApartmentOutlined,
  HotelOutlined,
  OutdoorGrillOutlined,
  RoomServiceOutlined,
  LocalFireDepartmentOutlined,
  SpaOutlined,
  BeachAccessOutlined,
  YardOutlined,
  BookmarkBorder,
  Bookmark,
  BorderColorOutlined,
} from '@mui/icons-material'
import { Button } from '@commons/ui'
import { useEffect } from 'react'

import Image from 'next/image'
import cheongsanImage from '@assets/cheongsan.png'
import profileImage from '@assets/profile_image.png'
import useProductsListBinding from './hooks/index.binding.hook'
import useLinkRouting from './hooks/index.link.routing.hook'
import useToggleTravelproductPick from './hooks/index.toggle.hook'
import { useAuth } from 'commons/providers/auth/auth.provider'
import { useQuery } from '@apollo/client'
import {
  FetchUserLoggedInDocument,
  FetchUserLoggedInQuery,
  FetchUserLoggedInQueryVariables,
  FetchTravelproductsIPickedDocument,
  FetchTravelproductsIPickedQuery,
  FetchTravelproductsIPickedQueryVariables,
} from 'commons/graphql/graphql'
import Pagination from '../pagination'
import { useProductsListContext } from '../context/products-list.context'

const { RangePicker } = DatePicker

const ITEMS_PER_PAGE = 10

// 이미지 URL을 처리하는 유틸리티 함수
const getImageUrl = (imageUrl: string | null | undefined): string | typeof cheongsanImage => {
  if (!imageUrl) return cheongsanImage
  // 이미 절대 URL인 경우 그대로 반환
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }
  // 상대 경로인 경우 storage.googleapis.com을 붙여서 반환
  if (imageUrl.startsWith('/')) {
    return `https://storage.googleapis.com${imageUrl}`
  }
  // 경로만 있는 경우 storage.googleapis.com을 붙여서 반환
  return `https://storage.googleapis.com/${imageUrl}`
}

// 프로필 이미지 URL을 처리하는 유틸리티 함수
const getProfileImageUrl = (imageUrl: string | null | undefined): string | typeof profileImage => {
  if (!imageUrl) return profileImage
  // 이미 절대 URL인 경우 그대로 반환
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }
  // 상대 경로인 경우 storage.googleapis.com을 붙여서 반환
  if (imageUrl.startsWith('/')) {
    return `https://storage.googleapis.com${imageUrl}`
  }
  // 경로만 있는 경우 storage.googleapis.com을 붙여서 반환
  return `https://storage.googleapis.com/${imageUrl}`
}

export default function ProductsListComponent() {
  const {
    activeTab,
    searchKeyword,
    currentPage,
    pickedProductIds,
    setActiveTab,
    setSearchKeyword,
    setCurrentPage,
    setPickedCountSum,
    setPickedProductIds,
    togglePickedProduct,
  } = useProductsListContext()
  const { isAuthenticated } = useAuth()

  // 로그인된 사용자 정보 가져오기
  const { data: userData } = useQuery<FetchUserLoggedInQuery, FetchUserLoggedInQueryVariables>(
    FetchUserLoggedInDocument,
    {
      skip: !isAuthenticated, // 로그인되지 않았으면 쿼리 실행 안 함
    }
  )

  const currentUser = userData?.fetchUserLoggedIn
  const userId = currentUser?._id || null

  // 로그인된 사용자가 pick한 상품 목록 가져오기
  const { data: pickedProductsData } = useQuery<
    FetchTravelproductsIPickedQuery,
    FetchTravelproductsIPickedQueryVariables
  >(FetchTravelproductsIPickedDocument, {
    skip: !isAuthenticated, // 로그인되지 않았으면 쿼리 실행 안 함
  })

  const { products, loading, error, refetch } = useProductsListBinding({
    // 예약 가능 숙소: isSoldout = false
    // 예약 마감 숙소: isSoldout = true
    isSoldout: activeTab === 'closed' ? true : false,
    search: searchKeyword || undefined,
    page: currentPage,
  })
  const { onClickProduct, onClickNewProduct } = useLinkRouting()
  const { onClickToggle: originalOnClickToggle } = useToggleTravelproductPick({
    refetch,
    isSoldout: activeTab === 'closed' ? true : false,
    search: searchKeyword || undefined,
    page: currentPage,
  })

  // products가 로드된 후 로그인된 사용자가 pick한 상품 목록과 동기화
  useEffect(() => {
    if (isAuthenticated && pickedProductsData?.fetchTravelproductsIPicked && products.length > 0) {
      // 사용자가 pick한 모든 상품 ID 목록
      const allPickedProductIds = new Set(
        pickedProductsData.fetchTravelproductsIPicked.map((product) => product._id)
      )

      // 현재 화면에 표시된 products 중에서 사용자가 pick한 상품만 필터링
      const currentProductIds = new Set(products.map((p) => p._id))
      const validPickedProducts = new Set(
        Array.from(allPickedProductIds).filter((id) => currentProductIds.has(id))
      )

      // Context의 pickedProductIds 업데이트
      setPickedProductIds(validPickedProducts)
    } else if (!isAuthenticated) {
      // 로그인되지 않은 경우 빈 Set으로 초기화
      setPickedProductIds(new Set())
    }
  }, [products, isAuthenticated, pickedProductsData, setPickedProductIds])

  // 토글 핸들러 래핑: 토글된 상품 ID를 상태에 추가 (Apollo Client 캐시 사용)
  const handleToggle = async (event: React.MouseEvent<HTMLDivElement>, productId: string) => {
    event.stopPropagation() // 카드 클릭 이벤트 방지 (페이지 이동 방지)

    // 디버깅: 인증 상태 확인
    console.log(
      '토글 시도 - isAuthenticated:',
      isAuthenticated,
      'currentUser:',
      currentUser,
      'userId:',
      userId
    )

    // 로그인되지 않은 사용자는 토글 불가
    if (!isAuthenticated || !userId) {
      console.log('토글 불가: 로그인되지 않음', { isAuthenticated, userId })
      return
    }

    // 토글 전 pickedCount 저장
    const productBeforeToggle = products.find((p) => p._id === productId)
    const pickedCountBefore = productBeforeToggle?.pickedCount || 0
    console.log('토글 전 pickedCount:', pickedCountBefore)

    try {
      const result = await originalOnClickToggle(event, productId)
      console.log('토글 결과:', result)

      // 토글 성공 시 상태 업데이트 (Apollo Client 캐시는 이미 업데이트됨)
      if (result && result.success && result.newPickedCount !== null) {
        const newPickedCount = result.newPickedCount
        console.log('토글 후 pickedCount:', newPickedCount, '(이전:', pickedCountBefore, ')')

        // pickedCount가 증가했으면 pick한 것 (아이콘 채움)
        // pickedCount가 감소했으면 unpick한 것 (아이콘 비움)
        if (newPickedCount > pickedCountBefore) {
          togglePickedProduct(productId, true)
          console.log('토글: pick됨 (아이콘 채움)', productId)
        } else if (newPickedCount < pickedCountBefore) {
          togglePickedProduct(productId, false)
          console.log('토글: unpick됨 (아이콘 비움)', productId)
        }
        // 같으면 변화 없음 (이미 올바른 상태)
      } else {
        console.log('토글 실패 또는 결과 없음')
      }
    } catch (error) {
      console.error('토글 처리 중 오류:', error)
    }
  }

  // 탭이나 검색어 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchKeyword, setCurrentPage])

  // products의 pickedCount 합계를 계산하여 context에 저장 (carousel 리패치 트리거용)
  useEffect(() => {
    const sum = products.reduce((acc, product) => acc + (product.pickedCount || 0), 0)
    setPickedCountSum(sum)
  }, [products, setPickedCountSum])

  // lastPage 계산
  // 현재 페이지의 아이템 수가 ITEMS_PER_PAGE보다 작으면 마지막 페이지로 간주
  // 그렇지 않으면 더 많은 페이지가 있다고 가정하여 충분히 큰 수로 설정
  const isLastPage = products.length < ITEMS_PER_PAGE && products.length > 0
  const lastPage = isLastPage ? currentPage : Math.max(currentPage + 10, 50) // 더 많은 페이지가 있다고 가정

  return (
    <div className={styles.container}>
      {/* 타이틀 영역 */}
      <h2 className={styles.title}>여기에서만 예약할 수 있는 숙소</h2>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* 버튼 영역 (탭 2개) */}
      <div className={styles.tabContainer}>
        <Button
          className={`${styles.tab} ${activeTab === 'available' ? styles.active : ''}`}
          onClick={() => setActiveTab('available')}
          variant={activeTab === 'available' ? 'secondary' : 'outline'}
          size="small"
          theme="light"
        >
          예약 가능 숙소
        </Button>
        <Button
          className={`${styles.tab} ${activeTab === 'closed' ? styles.active : ''}`}
          onClick={() => setActiveTab('closed')}
          variant={activeTab === 'closed' ? 'secondary' : 'outline'}
          size="small"
          theme="light"
        >
          예약 마감 숙소
        </Button>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* 서치바 영역 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          {/* 날짜 선택기 */}
          <div className={styles.datePicker}>
            <CalendarToday className={styles.calendarIcon} />
            <RangePicker
              className={styles.rangePicker}
              placeholder={['YYYY.MM.DD', 'YYYY.MM.DD']}
              format="YYYY.MM.DD"
              separator="-"
            />
          </div>

          {/* 검색바 */}
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="제목을 검색해 주세요."
              className={styles.searchInput}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          {/* 검색 버튼 */}
          <Button variant="secondary" size="medium" theme="light">
            검색
          </Button>
        </div>

        {/* 숙박권 판매하기 버튼 */}
        <Button variant="primary" size="medium" theme="light" onClick={onClickNewProduct}>
          <BorderColorOutlined className={styles.icon} />
          숙박권 판매하기
        </Button>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* 리스트 컴포넌트 영역 */}
      <div className={styles.listContainer}>
        {/* 필터 카테고리 */}
        <div className={styles.filterContainer}>
          <button className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <PersonOutline className={styles.icon} />
            </div>
            <span className={styles.filterText}>1인 전용</span>
          </button>
          <button className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <ApartmentOutlined className={styles.icon} />
            </div>
            <span className={styles.filterText}>아파트</span>
          </button>
          <button className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <HotelOutlined className={styles.icon} />
            </div>
            <span className={styles.filterText}>호텔</span>
          </button>
          <button className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <OutdoorGrillOutlined className={styles.icon} />
            </div>
            <span className={styles.filterText}>캠핑</span>
          </button>
          <button className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <RoomServiceOutlined className={styles.icon} />
            </div>
            <span className={styles.filterText}>룸 서비스 가능</span>
          </button>
          <button className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <LocalFireDepartmentOutlined className={styles.icon} />
            </div>
            <span className={styles.filterText}>불멍</span>
          </button>
          <button className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <SpaOutlined className={styles.icon} />
            </div>
            <span className={styles.filterText}>반신욕&스파</span>
          </button>
          <button className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <BeachAccessOutlined className={styles.icon} />
            </div>
            <span className={styles.filterText}>바다 위 숙소</span>
          </button>
          <button className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <YardOutlined className={styles.icon} />
            </div>
            <span className={styles.filterText}>플랜테리어</span>
          </button>
        </div>

        {/* 카드 그리드 영역 */}
        <div className={styles.cardGrid}>
          {loading ? (
            <div>로딩 중...</div>
          ) : error ? (
            <div>에러가 발생했습니다: {error.message}</div>
          ) : products.length === 0 ? (
            <div className={styles.emptyState}>상품이 없습니다.</div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className={styles.card}
                onClick={(e) => onClickProduct(e, product._id)}
              >
                {/* 이미지 영역 */}
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={getImageUrl(product.images?.[0])}
                    alt={product.name || '숙소 이미지'}
                    width={240}
                    height={200}
                    className={styles.cardImage}
                  />
                  <div
                    className={styles.cardBookmark}
                    onClick={(e) => {
                      handleToggle(e, product._id)
                      console.log('토글 훅: 토글 클릭')
                    }}
                  >
                    {isAuthenticated && userId && pickedProductIds.has(product._id) ? (
                      <Bookmark className={styles.bookmarkIcon} />
                    ) : (
                      <BookmarkBorder className={styles.bookmarkIcon} />
                    )}
                    <span className={styles.bookmarkCount}>{product.pickedCount || 0}</span>
                  </div>
                </div>
                {/* 콘텐츠 영역 */}
                <div className={styles.cardContent}>
                  {/* 제목과 설명 */}
                  <div className={styles.cardTitleSection}>
                    <div className={styles.cardTitle}>{product.name}</div>
                    <div className={styles.cardDescription}>{product.contents}</div>
                  </div>
                  {/* 태그 */}
                  <div className={styles.cardTags}>
                    {product.tags && product.tags.length > 0
                      ? product.tags.map((tag) => `#${tag}`).join(' ')
                      : ''}
                  </div>
                  {/* 프로필과 가격 */}
                  <div className={styles.cardFooter}>
                    <div className={styles.cardProfile}>
                      <Image
                        src={getProfileImageUrl(product.seller?.picture)}
                        alt={product.seller?.name || '프로필 이미지'}
                        width={24}
                        height={24}
                        className={styles.profileImage}
                      />
                      <span className={styles.profileName}>{product.seller?.name || '판매자'}</span>
                    </div>
                    {product.price && (
                      <div className={styles.cardPrice}>
                        <span className={styles.priceAmount}>{product.price.toLocaleString()}</span>
                        <span className={styles.priceUnit}>원</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination 영역 */}
        {!loading && !error && products.length > 0 && (
          <div className={styles.paginationContainer}>
            <Pagination
              refetch={refetch}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              lastPage={lastPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}
