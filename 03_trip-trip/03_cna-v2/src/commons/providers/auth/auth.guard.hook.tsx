'use client'

import { useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth.provider'
import { useModal } from '@commons/ui'
import { Modal } from '@commons/ui'

/**
 * 액션 GUARD 훅
 * 함수 호출 시점에 인가를 검증하고, 인가 실패 시 모달을 표시합니다.
 *
 * @returns requireAuth - 인가를 검증하는 함수. 인가 성공 시 true, 실패 시 false를 반환합니다.
 * @returns withAuth - 함수를 래핑하여 인가를 검증하는 고차 함수
 */
export function useAuthGuard() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { openModal, closeModal } = useModal()
  const modalShownRef = useRef(false)

  /**
   * 인가를 검증하는 함수
   * @returns 인가 성공 시 true, 실패 시 false
   */
  const requireAuth = useCallback((): boolean => {
    // 이미 인증된 경우 바로 true 반환
    if (isAuthenticated) {
      return true
    }

    // 모달이 이미 표시된 경우 false 반환 (중복 모달 방지)
    if (modalShownRef.current) {
      return false
    }

    // 모달 표시
    modalShownRef.current = true
    openModal(
      <Modal
        variant="info"
        actions="dual"
        title="로그인하시겠습니까"
        description={true}
        descriptionText="로그인이 필요한 기능입니다."
        confirmText="로그인하러가기"
        cancelText="취소"
        onConfirm={() => {
          closeModal()
          modalShownRef.current = false // 모달 닫힌 후 상태 리셋
          router.push('/login')
        }}
        onCancel={() => {
          closeModal()
          modalShownRef.current = false // 모달 닫힌 후 상태 리셋
        }}
      />
    )

    return false
  }, [isAuthenticated, openModal, closeModal, router])

  /**
   * 함수를 래핑하여 인가를 검증하는 고차 함수
   * @param fn - 실행할 함수
   * @returns 래핑된 함수
   */
  const withAuth = useCallback(
    <T extends (...args: unknown[]) => unknown>(fn: T): T => {
      return ((...args: Parameters<T>) => {
        if (!requireAuth()) {
          return
        }
        return fn(...args)
      }) as T
    },
    [requireAuth]
  )

  return {
    requireAuth,
    withAuth,
  }
}
