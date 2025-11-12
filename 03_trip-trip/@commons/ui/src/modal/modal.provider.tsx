'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './styles.module.css'

interface ModalContextType {
  isOpen: boolean
  openModal: (content: ReactNode) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

interface ModalProviderProps {
  children: ReactNode
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ReactNode>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const openModal = (content: ReactNode) => {
    setModalContent(content)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalContent(null)
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {mounted &&
        isOpen &&
        typeof window !== 'undefined' &&
        createPortal(
          <div className={styles.portal}>{modalContent}</div>,
          document.body
        )}
    </ModalContext.Provider>
  )
}

