'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './styles.module.css'
import { Input } from '@commons/ui'
import { Button } from '@commons/ui'
import { Modal } from 'antd'
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode'
import AddIcon from '@mui/icons-material/Add'
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk'
import 'react-quill/dist/quill.snow.css'

// react-quill을 dynamic import로 로드 (SSR 방지)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function ProductsWriteComponent() {
  // 카카오 맵 로더 초기화
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APPKEY || '',
    libraries: [],
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editorContent, setEditorContent] = useState('')
  const [address, setAddress] = useState({
    zipcode: '',
    base: '',
    detail: '',
  })
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null)

  // react-quill 툴바 설정
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'align',
    'link',
    'image',
  ]

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  // 주소를 좌표로 변환하는 함수
  const geocodeAddress = async (address: string) => {
    if (typeof window === 'undefined') return

    // 카카오 맵이 로드될 때까지 대기
    const checkKakao = (): Promise<void> => {
      return new Promise<void>((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const kakaoWindow = window as any
        if (kakaoWindow.kakao && kakaoWindow.kakao.maps) {
          resolve()
        } else {
          setTimeout(() => checkKakao().then(resolve), 100)
        }
      })
    }

    await checkKakao()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any).kakao
    if (!kakao || !kakao.maps) return

    interface GeocodeResult {
      y: string
      x: string
    }

    const geocoder = new kakao.maps.services.Geocoder()

    geocoder.addressSearch(
      address,
      (result: GeocodeResult[], status: string) => {
        if (status === kakao.maps.services.Status.OK && result.length > 0) {
          const coords = result[0]
          const latitude = coords.y
          const longitude = coords.x

          setLat(latitude)
          setLng(longitude)
          setMapCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) })
        }
      }
    )
  }

  const handleComplete = (data: Address) => {
    const fullAddress = data.address || data.roadAddress || data.jibunAddress || ''
    setAddress({
      zipcode: data.zonecode || '',
      base: fullAddress,
      detail: '',
    })
    setIsModalOpen(false)

    // 주소가 있으면 좌표로 변환
    if (fullAddress) {
      geocodeAddress(fullAddress)
    }
  }

  // 카카오 맵 스크립트 로드 확인 및 주소 변경 시 좌표 변환
  useEffect(() => {
    if (address.base) {
      // 약간의 지연을 두어 카카오 맵이 완전히 로드되도록 함
      const timer = setTimeout(() => {
        geocodeAddress(address.base)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [address.base])

  return (
    <div className={styles.container}>
      {/* 제목 */}
      <h1 className={styles.title}>숙박권 판매하기</h1>

      {/* 폼 영역 */}
      <div className={styles.formContainer}>
        {/* 상품명 */}
        <div className={styles.section}>
          <Input
            label="상품명"
            required
            placeholder="상품명을 입력해 주세요."
            size="m"
            status="enabled"
          />
        </div>

        <div className={styles.divider}></div>

        {/* 한줄 요약 */}
        <div className={styles.section}>
          <Input
            label="한줄 요약"
            required
            placeholder="상품을 한줄로 요약해 주세요."
            size="m"
            status="enabled"
          />
        </div>

        <div className={styles.divider}></div>

        {/* 상품 설명 */}
        <div className={styles.section}>
          <div className={styles.labelArea}>
            <span className={styles.label}>상품 설명</span>
            <span className={styles.required}>*</span>
          </div>
          <div className={styles.editorWrapper}>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              modules={modules}
              formats={formats}
              placeholder="내용을 입력해 주세요."
              className={styles.quillEditor}
            />
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* 판매 가격 */}
        <div className={styles.section}>
          <Input
            label="판매 가격"
            required
            placeholder="판매 가격을 입력해 주세요. (원 단위)"
            size="m"
            status="enabled"
          />
        </div>

        <div className={styles.divider}></div>

        {/* 태그 입력 */}
        <div className={styles.section}>
          <Input
            label="태그 입력"
            required
            placeholder="태그를 입력해 주세요."
            size="m"
            status="enabled"
          />
        </div>

        <div className={styles.divider}></div>

        {/* 주소 영역 */}
        <div className={styles.addressSection}>
          <div className={styles.addressLeft}>
            {/* 우편번호 */}
            <div className={styles.zipcodeSection}>
              <Input
                label="주소"
                required
                placeholder="01234"
                size="s"
                status="enabled"
                value={address.zipcode}
                readOnly
                showButton
                buttonText="우편번호 검색"
                onButtonClick={handleToggleModal}
                className={styles.zipcodeInput}
              />
            </div>

            {/* 상세주소 */}
            <div className={styles.detailAddressSection}>
              <Input
                placeholder="상세주소를 입력해 주세요."
                size="m"
                status="enabled"
                value={address.detail}
                onChange={(e) => setAddress((prev) => ({ ...prev, detail: e.target.value }))}
              />
            </div>

            {/* 위도 */}
            <div className={styles.latSection}>
              <Input
                label="위도(LAT)"
                required
                placeholder="주소를 먼저 입력해 주세요."
                size="m"
                status="read-only"
                value={lat}
                readOnly
                className={styles.disabledInput}
              />
            </div>

            {/* 경도 */}
            <div className={styles.lngSection}>
              <Input
                label="경도(LNG)"
                required
                placeholder="주소를 먼저 입력해 주세요."
                size="m"
                status="read-only"
                value={lng}
                readOnly
                className={styles.disabledInput}
              />
            </div>
          </div>

          {/* 상세 위치 (지도) */}
          <div className={styles.mapSection}>
            <div className={styles.mapLabel}>상세 위치</div>
            <div className={styles.mapContainer}>
              {mapCenter ? (
                <Map
                  center={mapCenter}
                  level={3}
                  className={styles.kakaoMap}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <div className={styles.mapPlaceholder}>
                  <span className={styles.mapPlaceholderText}>주소를 먼저 입력해 주세요.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* 사진 첨부 */}
        <div className={styles.section}>
          <div className={styles.labelArea}>
            <span className={styles.label}>사진 첨부</span>
            <span className={styles.required}>*</span>
          </div>
          <div className={styles.imageUploadArea}>
            <div className={styles.imageUploadBox}>
              <AddIcon className={styles.addIcon} />
              <span className={styles.uploadText}>클릭해서 사진 업로드</span>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className={styles.buttonContainer}>
          <Button variant="outline" size="medium" theme="light" type="button">
            취소
          </Button>
          <Button variant="secondary" size="medium" theme="light" type="submit" disabled>
            등록하기
          </Button>
        </div>
      </div>

      {/* 우편번호 검색 모달 */}
      {isModalOpen && (
        <Modal title="우편번호 검색" open={true} onOk={handleToggleModal} onCancel={handleToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </div>
  )
}

