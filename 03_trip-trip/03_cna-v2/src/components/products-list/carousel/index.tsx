'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { useRef } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './styles.module.css'
import useCarouselBinding from './hooks/index.binding.hook'
import useLinkRouting from './hooks/index.link.routing.hook'
import Image from 'next/image'
import cheongsanImage from '@assets/cheongsan.png'

export default function Carousel() {
  const { products, loading, error } = useCarouselBinding()
  const { onClickProduct } = useLinkRouting()
  const swiperRef = useRef<SwiperType | null>(null)

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
                <div className={styles.bookmarkButton}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.bookmarkIcon}
                  >
                    <path
                      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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


