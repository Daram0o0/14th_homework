'use client'
import { supabase } from 'commons/libraries/supabase'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface BadgeDetail {
  name: string
  description: string
  image_url: string
}

export default function AdminBadgeDetail() {
  const [badgeDetail, setBadgeDetail] = useState<BadgeDetail | null>(null)
  const { badgeId } = useParams()

  useEffect(() => {
    const fetchBadgeById = async () => {
      try {
        const { data, error } = await supabase
          .from('badges')
          .select('name, description, image_url')
          .eq('id', badgeId)
          .single()

        if (error) console.error('배지 상세 조회 에러', error)
        setBadgeDetail(data)
        console.log('🚀 ~ fetchBadgeById ~ data:', data)
      } catch (error) {
        console.error('배지 상세 조회 에러', error)
      }
    }
    fetchBadgeById()
  }, [badgeId])

  if (!badgeDetail) return <div>로딩중</div>
  console.log()
  const { name, description, image_url } = badgeDetail
  return (
    <div style={{ border: 'solid 1px red' }}>
      <p>이름: {name}</p>
      <p>설명: {description}</p>
      <p>
        이미지:
        {image_url && image_url !== '{}' && (
          <Image
            src={`https://storage.googleapis.com/${image_url}`}
            alt="업로드된 이미지"
            width={20}
            height={20}
          />
        )}
      </p>
    </div>
  )
}
