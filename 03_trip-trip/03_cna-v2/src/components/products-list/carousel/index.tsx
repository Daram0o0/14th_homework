'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './styles.module.css'

// 임시 데이터 (추후 API 연동 시 교체)
const accommodationData = [
  {
    id: 1,
    title: '포항 : 당장 가고 싶은 숙소',
    description: '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: '32,900',
    bookmarkCount: 24,
    imageUrl: '/images/placeholder.jpg', // 임시 이미지 경로
  },
  {
    id: 2,
    title: '강릉 : 마음까지 깨끗해지는 하얀 숙소',
    description: '살어리 살어리랏다 강릉에 평생 살어리랏다',
    price: '32,900',
    bookmarkCount: 24,
    imageUrl: '/images/placeholder.jpg', // 임시 이미지 경로
  },
  {
    id: 3,
    title: '제주 : 바다가 보이는 아늑한 숙소',
    description: '제주 바다를 바라보며 휴식을 즐기세요',
    price: '45,000',
    bookmarkCount: 18,
    imageUrl: '/images/placeholder.jpg', // 임시 이미지 경로
  },
  {
    id: 4,
    title: '부산 : 해운대 근처 편리한 숙소',
    description: '해운대 해수욕장과 가까운 최적의 위치',
    price: '38,500',
    bookmarkCount: 32,
    imageUrl: '/images/placeholder.jpg', // 임시 이미지 경로
  },
]

export default function Carousel() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>2024 끝여름 낭만있게 마무리 하고 싶다면?</div>
      <div className={styles.gap}></div>
      <div className={styles.carouselWrapper}>
        <Swiper
          slidesPerView={2}
          spaceBetween={24}
          navigation={true}
          modules={[Navigation]}
          className={styles.swiper}
        >
          {accommodationData.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <div className={styles.accommodationItem}>
                <div className={styles.imageWrapper}>
                  <div className={styles.imagePlaceholder}></div>
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
                  <span className={styles.bookmarkCount}>{item.bookmarkCount}</span>
                </div>
                <div className={styles.contentArea}>
                  <div className={styles.titleAndDescription}>
                    <div className={styles.itemTitle}>{item.title}</div>
                    <div className={styles.itemDescription}>{item.description}</div>
                  </div>
                  <div className={styles.priceArea}>
                    <span className={styles.price}>{item.price}</span>
                    <span className={styles.currency}>원</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}


