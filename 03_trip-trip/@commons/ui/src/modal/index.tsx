'use client'

/**
 * Modal Component
 *
 * Figma 참고 노드 ID:
 * - 참고할 모든 모달 컴포넌트 노드ID: 99:15030, 99:15187, 13051:11617, 13051:11664, 13051:11634, 13051:11664, 13051:11680
 */

import React from 'react'
import { Button } from '../button'
import styles from './styles.module.css'
import { useModal } from './modal.provider'

export interface ModalProps {
  variant?: 'info' | 'danger'
  actions?: 'single' | 'dual'
  description?: boolean
  logo?: boolean
  illust?: boolean
  size?: 's' | 'm'
  dropdown?: boolean
  title?: string
  descriptionText?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  children?: React.ReactNode
}

export function Modal({
  variant = 'info',
  actions = 'single',
  description = false,
  logo = false,
  illust = false,
  size = 'm',
  dropdown = false,
  title,
  descriptionText,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  children,
}: ModalProps) {
  // useModal을 optional로 사용 (스토리북에서 사용할 수 있도록)
  let closeModal: (() => void) | undefined
  try {
    const modalContext = useModal()
    closeModal = modalContext.closeModal
  } catch {
    // ModalProvider 밖에서 사용되는 경우 (스토리북 등)
    closeModal = undefined
  }

  const handleConfirm = () => {
    onConfirm?.()
    closeModal?.()
  }

  const handleCancel = () => {
    onCancel?.()
    closeModal?.()
  }

  // Button size 매핑: 모달 size 's' -> 'small', 'm' -> 'medium'
  const buttonSize = size === 's' ? 'small' : 'medium'

  return (
    <div className={`${styles.modal} ${styles[variant]} ${styles[size]}`}>
      {/* 일러스트 */}
      {illust && (
        <div className={styles.illustWrapper}>
          <img src="/assets/pointIllust.svg" alt="Illustration" className={styles.illust} />
        </div>
      )}

      {/* 타이틀 */}
      {title && <h2 className={styles.title}>{title}</h2>}

      {/* 드롭다운 */}
      {dropdown && (
        <button className={styles.dropdown} type="button" onClick={closeModal}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* 디스크립션 */}
      {description && descriptionText && <p className={styles.description}>{descriptionText}</p>}

      {/* 로고 */}
      {logo && (
        <div className={styles.logoWrapper}>
          <img src="/assets/triptrip.svg" alt="TRIP TRIP" className={styles.logo} />
        </div>
      )}

      {/* 커스텀 컨텐츠 */}
      {children}

      {/* 버튼 */}
      <div className={`${styles.actions} ${styles[actions]}`}>
        {actions === 'dual' && (
          <Button
            variant="outline"
            size={buttonSize}
            className={styles.button}
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
        )}
        <Button
          variant={variant === 'danger' ? 'secondary' : 'primary'}
          size={buttonSize}
          className={styles.button}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  )
}

export { useModal } from './modal.provider'
export { default as ModalProvider } from './modal.provider'
