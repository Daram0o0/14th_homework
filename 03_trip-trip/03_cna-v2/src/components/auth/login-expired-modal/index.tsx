'use client'

import { Modal } from 'antd'
import { useAuthExpiryStore } from 'commons/stores/auth-expiry-store'
import { useRouter } from 'next/navigation'
import styles from './styles.module.css'

export default function LoginExpiredModal() {
  const { isModalOpen, setModalOpen } = useAuthExpiryStore()
  const router = useRouter()

  const handleConfirm = () => {
    setModalOpen(false)
    // 로그인 페이지로 리다이렉트
    router.push('/login')
  }

  return (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
      className={styles.loginExpiredModal}
    >
      <div className={styles.modalContent}>
        <div className={styles.iconContainer}>
          <div className={styles.warningIcon}>⚠️</div>
        </div>
        <h3 className={styles.modalTitle}>로그인이 만료되었습니다</h3>
        <p className={styles.modalMessage}>
          보안을 위해 로그인이 만료되었습니다.
          <br />
          다시 로그인해주세요.
        </p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.confirmButton}
            onClick={handleConfirm}
          >
            로그인 페이지로 이동
          </button>
        </div>
      </div>
    </Modal>
  )
}
