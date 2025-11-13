// AuthGuard로 인해 사용하지 않는 코드
import { isTokenExpired } from 'commons/utils/auth'
import { useAuthExpiryStore } from 'commons/stores/auth-expiry-store'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const withAuth =
  <P extends object>(컴포넌트: React.ComponentType<P>) =>
  (props: P) => {
    const router = useRouter()
    const { handleTokenExpiry } = useAuthExpiryStore()
    const firedRef = useRef(false)
    useEffect(() => {
      if (firedRef.current) return
      firedRef.current = true

      const token = localStorage.getItem('accessToken') ?? undefined
      if (!token) {
        alert('로그인 후 서비스를 이용해주세요.')
        router.push('/login')
        return
      }
      if (isTokenExpired(token)) {
        handleTokenExpiry()
      }
    }, [router, handleTokenExpiry])
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('accessToken') ?? undefined : undefined
    if (!token) return null
    return <컴포넌트 {...props} />
  }
