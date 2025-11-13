'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { useRef, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './styles.module.css'
import useCarouselBinding from './hooks/index.binding.hook'
import useLinkRouting from './hooks/index.link.routing.hook'
import useToggleTravelproductPick from './hooks/index.toggle.hook'
import { useAuth } from 'commons/providers/auth/auth.provider'
import { useQuery } from '@apollo/client'
import {
  FetchTravelproductsIPickedDocument,
  FetchTravelproductsIPickedQuery,
  FetchTravelproductsIPickedQueryVariables,
} from 'commons/graphql/graphql'
import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import Image from 'next/image'
import cheongsanImage from '@assets/cheongsan.png'
import { useProductsListContext } from '../context/products-list.context'

export default function Carousel() {
  const { products, loading, error, refetch } = useCarouselBinding()
  const { onClickProduct } = useLinkRouting()
  const { isAuthenticated } = useAuth()
  const { pickedProductIds, setPickedProductIds, setPickedCountSum, togglePickedProduct } =
    useProductsListContext()
  const swiperRef = useRef<SwiperType | null>(null)

  const { onClickToggle: originalOnClickToggle } = useToggleTravelproductPick({
    refetch,
  })

  // 로그인된 사용자가 pick한 상품 목록 가져오기
  const { data: pickedProductsData } = useQuery<
    FetchTravelproductsIPickedQuery,
    FetchTravelproductsIPickedQueryVariables
  >(FetchTravelproductsIPickedDocument, {
    skip: !isAuthenticated, // 로그인되지 않았으면 쿼리 실행 안 함
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

      // Context의 pickedProductIds 업데이트 (기존 값과 병합)
      setPickedProductIds((prev) => {
        const merged = new Set([...Array.from(prev), ...Array.from(validPickedProducts)])
        return merged
      })
    } else if (!isAuthenticated) {
      // 로그인되지 않은 경우 빈 Set으로 초기화하지 않음 (list에서 관리)
    }
  }, [products, isAuthenticated, pickedProductsData, setPickedProductIds])

  // products의 pickedCount 합계를 계산하여 context에 저장 (list 리패치 트리거용)
  useEffect(() => {
    const sum = products.reduce((acc, product) => acc + (product.pickedCount || 0), 0)
    setPickedCountSum(sum)
  }, [products, setPickedCountSum])

  // 토글 핸들러 래핑: 토글된 상품 ID를 상태에 추가 (Apollo Client 캐시 사용)
  const handleToggle = async (event: React.MouseEvent<HTMLDivElement>, productId: string) => {
    event.stopPropagation() // 카드 클릭 이벤트 방지 (페이지 이동 방지)

    // 디버깅: 인증 상태 확인
    console.log('토글 시도 - isAuthenticated:', isAuthenticated)

    // 로그인되지 않은 사용자는 토글 불가
    if (!isAuthenticated) {
      console.log('토글 불가: 로그인되지 않음', { isAuthenticated })
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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>2024 끝여름 낭만있게 마무리 하고 싶다면?</div>
        <div className={styles.gap}></div>
        <div className={styles.carouselWrapper}>로딩 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>2024 끝여름 낭만있게 마무리 하고 싶다면?</div>
        <div className={styles.gap}></div>
        <div className={styles.carouselWrapper}>데이터를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    )
  }

  const formatPrice = (price: number | null | undefined): string => {
    if (!price) return '0'
    return price.toLocaleString('ko-KR')
  }

  const getImageUrl = (imageUrl: string | null | undefined): string | null => {
    if (!imageUrl) return null
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

  return (
    <div className={styles.container}>
      <div className={styles.title}>2024 끝여름 낭만있게 마무리 하고 싶다면?</div>
      <div className={styles.gap}></div>
      <div className={styles.carouselWrapper}>
        <button
          className={styles.navButtonPrev}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="이전 슬라이드"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="white" />
            <path
              d="M22 14L16 20L22 26"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Swiper
          slidesPerView={2}
          spaceBetween={24}
          modules={[Navigation, Autoplay]}
          className={styles.swiper}
          loop={products.length >= 4}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
        >
          {products.map((product) => {
            const rawImageUrl = product.images && product.images[0] ? product.images[0] : null
            const imageUrl = rawImageUrl ? getImageUrl(rawImageUrl) : null
            return (
              <SwiperSlide key={product._id} className={styles.slide}>
                <div
                  className={styles.accommodationItem}
                  onClick={(e) => onClickProduct(e, product._id)}
                >
                  <div className={styles.imageWrapper}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <Image
                        src={cheongsanImage}
                        alt="청산 이미지"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    <div className={styles.gradientOverlay}></div>
                  </div>
                <div
                  className={styles.bookmarkButton}
                  onClick={(e) => {
                    handleToggle(e, product._id)
                    console.log('토글 훅: 토글 클릭')
                  }}
                >
                  {isAuthenticated && pickedProductIds.has(product._id) ? (
                    <Bookmark className={styles.bookmarkIcon} />
                  ) : (
                    <BookmarkBorder className={styles.bookmarkIcon} />
                  )}
                  <span className={styles.bookmarkCount}>{product.pickedCount ?? 0}</span>
                </div>
                <div className={styles.contentArea}>
                  <div className={styles.titleAndDescription}>
                    <div className={styles.itemTitle}>{product.name}</div>
                    <div className={styles.itemDescription}>{product.contents}</div>
                  </div>
                  <div className={styles.priceArea}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    <span className={styles.currency}>원</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            )
          })}
        </Swiper>
        <button
          className={styles.navButtonNext}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="다음 슬라이드"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="white" />
            <path
              d="M18 14L24 20L18 26"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}


