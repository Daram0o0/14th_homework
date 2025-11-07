'use client'
import { isTokenExpired } from 'commons/utils/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const useRequireAuth = () => {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('accessToken') ?? undefined
    if (!token) {
      alert('로그인 후 서비스를 이용해주세요.')
      router.replace('/login')
    }
  }, [router])
}

export const useCheckTokenExpired = () => {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('accessToken') ?? undefined
    if (!token) return
    if (isTokenExpired(token)) {
      alert('로그인이 만료되었습니다. 로그인 후 다시 서비스를 이용해주세요.')
      localStorage.removeItem('accessToken')
      router.replace('/login')
    }
  }, [router])
}

export function useAuthGuard() {
  const router = useRouter()
  const firedRef = useRef(false)
  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true

    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert('로그인 후 서비스를 이용해주세요.')
      router.push('/login')
      return
    }
    if (isTokenExpired(token)) {
      alert('로그인이 만료되었습니다. 로그인 후 다시 이용해주세요.')
      localStorage.removeItem('accessToken')
      router.push('/login')
    }
  }, [router])
}

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setIsAuthenticated(false)
      return
    }
    if (isTokenExpired(token)) {
      setIsAuthenticated(false)
      return
    }
    setIsAuthenticated(true)
  }, [])

  return isAuthenticated
}
