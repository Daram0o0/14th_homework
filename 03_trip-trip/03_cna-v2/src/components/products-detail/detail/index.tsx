'use client'
import styles from './styles.module.css'
import {
  DeleteOutlined,
  LinkOutlined,
  PlaceOutlined,
  BookmarkBorderOutlined,
} from '@mui/icons-material'
import Image from 'next/image'
import cheongsanImage from '@assets/cheongsan.png'
import profileImage from '@assets/profiles/profile5.webp'
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk'
import { Button } from '@commons/ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { useRef, useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import useProductsDetailBinding from './hooks/index.binding.hook'

interface ProductsDetailComponentProps {
  onTabChange?: (tab: 'detail' | 'qna') => void
}

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

export default function ProductsDetailComponent({ onTabChange }: ProductsDetailComponentProps) {
  useKakaoLoader({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APPKEY || '', libraries: [] })

  const {
    product,
    loading,
    error,
    isToggling,
    isDeleting,
    isDeleteModalOpen,
    isOwner,
    handleToggle,
    handleCopyLink,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  } = useProductsDetailBinding()

  const [mainImageIndex, setMainImageIndex] = useState(0)

  const swiperRef = useRef<SwiperType | null>(null)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

  // 이미지 목록 처리
  const images = product?.images || []
  const thumbnailImages = images.length > 0 ? images : []
  const mainImage = thumbnailImages[mainImageIndex] || null

  // 지도 좌표 처리 (우선순위: address > lat/lng > zipcode)
  const getMapLocation = () => {
    const address = product?.travelproductAddress
    if (!address) return { lat: 36.0322, lng: 129.365, hasLocation: false }

    // 1순위: address가 있는 경우
    if (address.address) {
      // 주소가 있으면 lat, lng도 함께 있을 것으로 가정
      return {
        lat: address.lat || 36.0322,
        lng: address.lng || 129.365,
        hasLocation: true,
        locationInfo: address.address,
      }
    }

    // 2순위: lat, lng가 있는 경우
    if (address.lat && address.lng) {
      return {
        lat: address.lat,
        lng: address.lng,
        hasLocation: true,
        locationInfo: `위도: ${address.lat}, 경도: ${address.lng}`,
      }
    }

    // 3순위: zipcode가 있는 경우
    if (address.zipcode) {
      // zipcode만 있는 경우 기본 좌표 사용하고 마커 표시
      return {
        lat: 36.0322,
        lng: 129.365,
        hasLocation: true,
        locationInfo: `우편번호: ${address.zipcode}`,
      }
    }

    return { lat: 36.0322, lng: 129.365, hasLocation: false }
  }

  const mapLocation = getMapLocation()
  const mapCenter = { lat: mapLocation.lat, lng: mapLocation.lng }

  // 툴팁에 표시할 주소 정보 가져오기
  const getTooltipAddress = () => {
    const address = product?.travelproductAddress
    if (!address) return ''

    // 1순위: address가 있으면 해당 주소를 표시
    if (address.address) {
      return address.address
    }

    // 2순위: lat, lng가 있으면 좌표를 표시
    if (address.lat && address.lng) {
      return `위도: ${address.lat}, 경도: ${address.lng}`
    }

    // 3순위: zipcode가 있으면 우편번호를 표시
    if (address.zipcode) {
      return `우편번호: ${address.zipcode}`
    }

    return ''
  }

  const tooltipAddress = getTooltipAddress()

  // 가격 포맷팅
  const formattedPrice = product?.price ? product.price.toLocaleString() : '0'

  // 태그 포맷팅
  const formattedTags = product?.tags ? `#${product.tags.join(' #')}` : ''

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!thumbnailContainerRef.current || !swiperRef.current) return

      const container = thumbnailContainerRef.current
      const rect = container.getBoundingClientRect()
      const isHovered =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (isHovered) {
        e.preventDefault()
        if (e.deltaY > 0) {
          // 아래로 스크롤
          swiperRef.current.slideNext()
        } else {
          // 위로 스크롤
          swiperRef.current.slidePrev()
        }
      }
    }

    const container = thumbnailContainerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  // 로딩 및 에러 처리
  if (loading) {
    return (
      <div className={styles.container}>
        <div>로딩 중...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className={styles.container}>
        <div>상품을 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* 탭 영역 (1280 x 49) */}
      <div className={styles.tabContainer}>
        <div className={styles.tabButton} onClick={() => onTabChange?.('detail')}>
          <span className={styles.tabTextActive}>상세 정보</span>
          <div className={styles.tabIndicator}></div>
        </div>
        <div className={styles.tabButton} onClick={() => onTabChange?.('qna')}>
          <span className={styles.tabTextInactive}>문의하기</span>
        </div>
      </div>

      {/* gap (1280 x 40) */}
      <div className={styles.gap}></div>

      {/* 헤더 영역 */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.iconButtons}>
            {isOwner && (
              <button
                className={styles.iconButton}
                onClick={handleOpenDeleteModal}
                disabled={isDeleting}
                title="삭제"
              >
                <DeleteOutlined />
              </button>
            )}
            <button className={styles.iconButton} onClick={handleCopyLink} title="링크 복사">
              <LinkOutlined />
            </button>
            <Tooltip
              placement="bottomRight"
              title={tooltipAddress}
              arrow={false}
              color="white"
              overlayInnerStyle={{ color: 'black' }}
            >
              <button className={styles.iconButton} title="위치">
                <PlaceOutlined />
              </button>
            </Tooltip>
            <button className={styles.bookmarkButton} onClick={handleToggle} disabled={isToggling}>
              <BookmarkBorderOutlined />
              <span className={styles.bookmarkCount}>{product.pickedCount || 0}</span>
            </button>
          </div>
        </div>
        <p className={styles.subtitle}>{product.remarks || ''}</p>
        {formattedTags && <p className={styles.tags}>{formattedTags}</p>}
      </div>

      {/* gap (1280 x 40) */}
      <div className={styles.gap}></div>

      {/* 메인 영역 (1280 x 600) */}
      <div className={styles.mainArea}>
        {/* 왼쪽: 이미지 갤러리 영역 */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <Image
              src={mainImage ? getImageUrl(mainImage) : cheongsanImage}
              alt="메인 이미지"
              width={640}
              height={480}
              className={styles.mainImageContent}
            />
          </div>
          <div className={styles.thumbnailContainer} ref={thumbnailContainerRef}>
            {thumbnailImages.length > 0 ? (
              <Swiper
                direction="vertical"
                slidesPerView={3.2}
                spaceBetween={16}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={thumbnailImages.length > 3}
                modules={[Autoplay]}
                className={styles.thumbnailSwiper}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                onSlideChange={(swiper) => {
                  setMainImageIndex(swiper.realIndex)
                }}
              >
                {thumbnailImages.map((image, index) => (
                  <SwiperSlide key={index} className={styles.thumbnailSlide}>
                    <div
                      className={styles.thumbnail}
                      onClick={() => {
                        setMainImageIndex(index)
                        swiperRef.current?.slideTo(index)
                      }}
                    >
                      <Image
                        src={getImageUrl(image)}
                        alt={`썸네일 ${index + 1}`}
                        width={180}
                        height={136}
                        className={`${styles.thumbnailImage} ${
                          index === mainImageIndex ? styles.active : styles.inactive
                        }`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className={styles.thumbnail}>
                <Image
                  src={cheongsanImage}
                  alt="썸네일"
                  width={180}
                  height={136}
                  className={`${styles.thumbnailImage} ${styles.active}`}
                />
              </div>
            )}
            <div className={styles.gradientOverlay}></div>
          </div>
        </div>

        {/* 오른쪽: 가격/구매/판매자 정보 영역 */}
        <div className={styles.purchaseInfo}>
          <div className={styles.purchaseCard}>
            <div className={styles.priceSection}>
              <div className={styles.priceRow}>
                <span className={styles.price}>{formattedPrice}</span>
                <span className={styles.priceUnit}>원</span>
              </div>
              <div className={styles.descriptionSection}>
                <p className={styles.descriptionText}>
                  숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
                </p>
                <p className={styles.descriptionTextLight}>
                  상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.
                </p>
              </div>
              <Button
                variant="primary"
                size="large"
                theme="light"
                className={styles.purchaseButton}
              >
                구매하기
              </Button>
            </div>
            <div className={styles.sellerSection}>
              <h3 className={styles.sellerTitle}>판매자</h3>
              <div className={styles.sellerProfile}>
                <Image
                  src={getProfileImageUrl(product.seller?.picture)}
                  alt="판매자 프로필"
                  width={40}
                  height={40}
                  className={styles.sellerImage}
                />
                <span className={styles.sellerName}>{product.seller?.name || ''}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* gap (1280 x 40) */}
      <div className={styles.gap}></div>

      {/* line (844 x 1) */}
      <div className={styles.line}></div>

      {/* gap (1280 x 40) */}
      <div className={styles.gap}></div>

      {/* 내용 영역 (844 x auto) */}
      <div className={styles.contentArea}>
        <h2 className={styles.contentTitle}>상세 설명</h2>
        <p className={styles.contentText}>{product.contents || ''}</p>
      </div>

      {/* gap (1280 x 40) */}
      <div className={styles.gap}></div>

      {/* line (844 x 1) */}
      <div className={styles.line}></div>

      {/* gap (1280 x 40) */}
      <div className={styles.gap}></div>

      {/* 지도 영역 (844 x 324) */}
      <div className={styles.mapArea}>
        <h2 className={styles.mapTitle}>상세 위치</h2>
        <div className={styles.mapContainer}>
          <Map
            center={mapCenter}
            level={3}
            className={styles.kakaoMap}
            style={{ width: '100%', height: '100%' }}
          >
            {mapLocation.hasLocation && (
              <MapMarker position={mapCenter} title={mapLocation.locationInfo} />
            )}
          </Map>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseDeleteModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>상품 삭제</h3>
            <p className={styles.modalMessage}>
              정말로 이 상품을 삭제하시겠습니까?
              <br />
              삭제된 상품은 복구할 수 없습니다.
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalCancelButton}
                onClick={handleCloseDeleteModal}
                disabled={isDeleting}
              >
                취소
              </button>
              <button
                className={styles.modalDeleteButton}
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
