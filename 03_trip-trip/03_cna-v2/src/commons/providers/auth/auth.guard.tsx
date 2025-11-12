'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from './auth.provider'
import { isMemberOnlyRoute } from 'commons/constants/url'
import { useModal } from '@commons/ui'
import { Modal } from '@commons/ui'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { openModal, closeModal } = useModal()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isAuthProviderReady, setIsAuthProviderReady] = useState(false)
  const modalShownRef = useRef<string | null>(null)

  // AuthProvider 초기화 확인 (마운트 후 한 번만 실행)
  useEffect(() => {
    // AuthProvider의 useEffect가 실행되어 상태가 업데이트될 때까지 대기
    // 짧은 지연 후 초기화 완료로 간주
    const timer = setTimeout(() => {
      setIsAuthProviderReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // 인가 검증
  useEffect(() => {
    if (!isAuthProviderReady || !pathname) {
      return
    }

    const isMemberOnly = isMemberOnlyRoute(pathname)

    // 회원 전용 경로가 아니면 바로 인가
    if (!isMemberOnly) {
      setIsAuthorized(true)
      modalShownRef.current = null // 공개 경로로 이동 시 모달 표시 상태 리셋
      return
    }

    // 회원 전용 경로인 경우 인증 상태 확인
    if (isAuthenticated) {
      setIsAuthorized(true)
      modalShownRef.current = null // 인증 성공 시 모달 표시 상태 리셋
    } else {
      setIsAuthorized(false)

      // 같은 경로에서 모달이 아직 표시되지 않았으면 표시
      if (modalShownRef.current !== pathname) {
        modalShownRef.current = pathname
        openModal(
          <Modal
            variant="info"
            actions="single"
            title="로그인해주세요"
            description={true}
            descriptionText="로그인이 필요한 페이지입니다."
            confirmText="확인"
            onConfirm={() => {
              closeModal()
              router.push('/login')
            }}
          />
        )
      }
    }
  }, [isAuthProviderReady, pathname, isAuthenticated, openModal, closeModal, router])

  // 인가가 완료되지 않았으면 빈 화면 표시
  if (isAuthorized === null || !isAuthProviderReady) {
    return null
  }

  // 인가 실패 시 빈 화면 유지
  if (isAuthorized === false) {
    return null
  }

  // 인가 성공 시 children 표시
  return <>{children}</>
}
