'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  _id: string
  email: string
  name: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: () => void
  logout: () => void
  checkAuthStatus: () => boolean
  getUser: () => User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const checkAuthStatus = useCallback((): boolean => {
    if (typeof window === 'undefined') return false
    const accessToken = localStorage.getItem('accessToken')
    return !!accessToken
  }, [])

  const getUser = useCallback((): User | null => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    try {
      return JSON.parse(userStr) as User
    } catch {
      return null
    }
  }, [])

  const login = useCallback(() => {
    router.push('/login')
  }, [router])

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
    }
    setIsAuthenticated(false)
    setUser(null)
    router.push('/login')
  }, [router])

  useEffect(() => {
    const updateAuthState = () => {
      const authStatus = checkAuthStatus()
      const userData = getUser()
      setIsAuthenticated(authStatus)
      setUser(userData)
    }

    // 초기 상태 설정
    updateAuthState()

    // storage 이벤트 리스너 (다른 탭에서의 변경 감지)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'user') {
        updateAuthState()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // 주기적으로 상태 확인 (같은 탭에서의 변경 감지)
    const interval = setInterval(updateAuthState, 100)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [checkAuthStatus, getUser])

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuthStatus,
    getUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

