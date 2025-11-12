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
  BorderColorOutlined,
} from '@mui/icons-material'
import { Button } from '@commons/ui'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import cheongsanImage from '@assets/cheongsan.png'
import profileImage from '@assets/profile_image.png'
import useProductsListBinding from './hooks/index.binding.hook'
import Pagination from '../pagination'

const { RangePicker } = DatePicker

const ITEMS_PER_PAGE = 12

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
  const [activeTab, setActiveTab] = useState<'available' | 'closed'>('available')
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)

  const { products, loading, error, refetch } = useProductsListBinding({
    isSoldout: activeTab === 'closed',
    search: searchKeyword || undefined,
    page: currentPage,
  })

  // 탭이나 검색어 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchKeyword])

  // lastPage 계산
  // 현재 페이지의 아이템 수가 ITEMS_PER_PAGE보다 작으면 마지막 페이지로 간주
  // 실제로는 서버에서 총 개수를 받아와야 하지만, 현재는 이 방식으로 처리
  const isLastPage = products.length < ITEMS_PER_PAGE && products.length > 0
  const lastPage = isLastPage ? currentPage : currentPage + 1

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
        <Button variant="primary" size="medium" theme="light">
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
            <div>상품이 없습니다.</div>
          ) : (
            products.map((product) => (
              <div key={product._id} className={styles.card}>
                {/* 이미지 영역 */}
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={getImageUrl(product.images?.[0])}
                    alt={product.name || '숙소 이미지'}
                    width={296}
                    height={296}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardBookmark}>
                    <BookmarkBorder className={styles.bookmarkIcon} />
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
                  {product.tags && product.tags.length > 0 && (
                    <div className={styles.cardTags}>
                      {product.tags.map((tag) => `#${tag}`).join(' ')}
                    </div>
                  )}
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
