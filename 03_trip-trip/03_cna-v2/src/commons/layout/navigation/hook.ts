'use client'
import { usePathname } from 'next/navigation'

export function useActiveNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname?.includes(path) ?? false
  }

  return {
    isBoardsActive: isActive('boards'),
    isProductsActive: isActive('products'),
    isMypageActive: isActive('mypage'),
  }
}






