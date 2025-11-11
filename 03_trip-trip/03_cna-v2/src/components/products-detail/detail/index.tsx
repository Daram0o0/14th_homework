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
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk'
import { Button } from '@commons/ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { useRef, useEffect } from 'react'

interface ProductsDetailComponentProps {
  onTabChange?: (tab: 'detail' | 'qna') => void
}

export default function ProductsDetailComponent({ onTabChange }: ProductsDetailComponentProps) {
  useKakaoLoader({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APPKEY || '', libraries: [] })

  // 포항 좌표 (임시, 실제 데이터로 교체 필요)
  const mapCenter = { lat: 36.0322, lng: 129.365 }

  // 썸네일 이미지 목록 (임시 데이터, 실제 데이터로 교체 필요)
  const thumbnailImages = [
    { src: cheongsanImage, alt: '썸네일 1' },
    { src: cheongsanImage, alt: '썸네일 2' },
    { src: cheongsanImage, alt: '썸네일 3' },
    { src: cheongsanImage, alt: '썸네일 4' },
    { src: cheongsanImage, alt: '썸네일 5' },
    { src: cheongsanImage, alt: '썸네일 6' },
    { src: cheongsanImage, alt: '썸네일 7' },
    { src: cheongsanImage, alt: '썸네일 8' },
  ]

  const swiperRef = useRef<SwiperType | null>(null)
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)

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
          <h1 className={styles.title}>포항 : 숙박권 명이 여기에 들어갑니다</h1>
          <div className={styles.iconButtons}>
            <button className={styles.iconButton}>
              <DeleteOutlined />
            </button>
            <button className={styles.iconButton}>
              <LinkOutlined />
            </button>
            <button className={styles.iconButton}>
              <PlaceOutlined />
            </button>
            <button className={styles.bookmarkButton}>
              <BookmarkBorderOutlined />
              <span className={styles.bookmarkCount}>24</span>
            </button>
          </div>
        </div>
        <p className={styles.subtitle}>모던한 분위기의 감도높은 숙소</p>
        <p className={styles.tags}>#6인 이하 #건식 사우나 #애견동반 가능</p>
      </div>

      {/* gap (1280 x 40) */}
      <div className={styles.gap}></div>

      {/* 메인 영역 (1280 x 600) */}
      <div className={styles.mainArea}>
        {/* 왼쪽: 이미지 갤러리 영역 */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <Image
              src={cheongsanImage}
              alt="메인 이미지"
              width={640}
              height={480}
              className={styles.mainImageContent}
            />
          </div>
          <div className={styles.thumbnailContainer} ref={thumbnailContainerRef}>
            <Swiper
              direction="vertical"
              slidesPerView={3.2}
              spaceBetween={16}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              modules={[Autoplay]}
              className={styles.thumbnailSwiper}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
            >
              {thumbnailImages.map((image, index) => (
                <SwiperSlide key={index} className={styles.thumbnailSlide}>
                  <div className={styles.thumbnail}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={180}
                      height={136}
                      className={styles.thumbnailImage}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.gradientOverlay}></div>
          </div>
        </div>

        {/* 오른쪽: 가격/구매/판매자 정보 영역 */}
        <div className={styles.purchaseInfo}>
          <div className={styles.purchaseCard}>
            <div className={styles.priceSection}>
              <div className={styles.priceRow}>
                <span className={styles.price}>32,500</span>
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
                  src={profileImage}
                  alt="판매자 프로필"
                  width={40}
                  height={40}
                  className={styles.sellerImage}
                />
                <span className={styles.sellerName}>김상훈</span>
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
        <p className={styles.contentText}>
          살어리 살어리랏다 쳥산(靑山)애 살어리랏다 멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다
          얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도
          자고 니러 우니로라 리얄리 얄라셩 얄라리 얄라 가던 새 가던 새 본다 믈 아래 가던 새 본다
          잉무든 장글란 가지고 믈 아래 가던 새 본다 얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          이링공 뎌링공 ᄒᆞ야 나즈란 디내와손뎌
          <br />
          오리도 가리도 업슨 바므란 ᄯᅩ 엇디 호리라
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          어듸라 더디던 돌코 누리라 마치던 돌코
          <br />
          믜리도 괴리도 업시 마자셔 우니노라
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          살어리 살어리랏다 바ᄅᆞ래 살어리랏다
          <br />
          ᄂᆞᄆᆞ자기 구조개랑 먹고 바ᄅᆞ래 살어리랏다
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          가다가 가다가 드로라 에졍지 가다가 드로라
          <br />
          사ᄉᆞ미 지ᇝ대예 올아셔 ᄒᆡ금(奚琴)을 혀거를 드로라
          <br />
          얄리얄리 얄라셩 얄라리 얄라
          <br />
          <br />
          가다니 ᄇᆡ브른 도긔 설진 강수를 비조라
          <br />
          조롱곳 누로기 ᄆᆡ와 잡ᄉᆞ와니 내 엇디 ᄒᆞ리잇고
          <br />
          얄리얄리 얄라셩 얄라리 얄라
        </p>
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
          />
        </div>
      </div>
    </div>
  )
}
