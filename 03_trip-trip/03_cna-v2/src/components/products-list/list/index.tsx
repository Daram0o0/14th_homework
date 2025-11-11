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
} from '@mui/icons-material'
import { Button } from '@commons/ui'
import { useState } from 'react'
import Image from 'next/image'
import cheongsanImage from '@assets/cheongsan.png'
import profileImage from '@assets/profile_image.png'

const { RangePicker } = DatePicker

export default function ProductsListComponent() {
  const [activeTab, setActiveTab] = useState<'available' | 'closed'>('available')

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
          variant={activeTab === 'available' ? 'primary' : 'outline'}
          size="medium"
          theme="light"
        >
          예약 가능 숙소
        </Button>
        <Button
          className={`${styles.tab} ${activeTab === 'closed' ? styles.active : ''}`}
          onClick={() => setActiveTab('closed')}
          variant={activeTab === 'closed' ? 'primary' : 'outline'}
          size="medium"
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
            <input type="text" placeholder="제목을 검색해 주세요." className={styles.searchInput} />
          </div>

          {/* 검색 버튼 */}
          <Button variant="secondary" size="medium" theme="light">
            검색
          </Button>
        </div>

        {/* 숙박권 판매하기 버튼 */}
        <Button variant="primary" size="medium" theme="light">
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
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.card}>
              {/* 이미지 영역 */}
              <div className={styles.cardImageWrapper}>
                <Image
                  src={cheongsanImage}
                  alt="숙소 이미지"
                  width={296}
                  height={296}
                  className={styles.cardImage}
                />
                <div className={styles.cardBookmark}>
                  <BookmarkBorder className={styles.bookmarkIcon} />
                  <span className={styles.bookmarkCount}>24</span>
                </div>
              </div>
              {/* 콘텐츠 영역 */}
              <div className={styles.cardContent}>
                {/* 제목과 설명 */}
                <div className={styles.cardTitleSection}>
                  <div className={styles.cardTitle}>
                    살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애
                    살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여
                    널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라
                  </div>
                  <div className={styles.cardDescription}>
                    살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애
                    살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여
                    널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라
                  </div>
                </div>
                {/* 태그 */}
                <div className={styles.cardTags}>#6인 이하 #건식 사우나 #애견동반 가능</div>
                {/* 프로필과 가격 */}
                <div className={styles.cardFooter}>
                  <div className={styles.cardProfile}>
                    <Image
                      src={profileImage}
                      alt="프로필 이미지"
                      width={24}
                      height={24}
                      className={styles.profileImage}
                    />
                    <span className={styles.profileName}>빈얀트리</span>
                  </div>
                  <div className={styles.cardPrice}>
                    <span className={styles.priceAmount}>32,900</span>
                    <span className={styles.priceUnit}>원</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
