'use client'

import { create } from 'zustand'

interface IAuthExpiryStore {
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
  handleTokenExpiry: () => void
}

export const useAuthExpiryStore = create<IAuthExpiryStore>((set, get) => ({
  isModalOpen: false,

  setModalOpen: (open: boolean) => {
    set({ isModalOpen: open })
  },

  handleTokenExpiry: () => {
    const { isModalOpen } = get()

    // 이미 모달이 열려있는 경우 중복 실행 방지
    if (isModalOpen) {
      return
    }

    // 토큰 제거
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
    }

    // 모달 표시
    set({ isModalOpen: true })
  },
}))
