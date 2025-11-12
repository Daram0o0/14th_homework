'use client'

import { ApolloClient, ApolloProvider, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { useAccessTokenStore } from 'commons/stores/access-token-store'
import { useEffect } from 'react'

interface IApolloSetting {
  children: React.ReactNode
}

export default function ApiProvider({ children }: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore()

  useEffect(() => {
    const result = localStorage.getItem('accessToken')
    setAccessToken(result ?? '')
  }, [setAccessToken])

  // 에러 처리 링크: 토큰 만료 시 자동 로그아웃
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        // UNAUTHENTICATED 에러 감지 (토큰 만료)
        if (extensions?.code === 'UNAUTHENTICATED') {
          // 토큰 제거
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken')
            setAccessToken('')

            // 사용자에게 알림
            alert('로그인이 만료되었습니다. 다시 로그인해주세요.')

            // 로그인 페이지로 리다이렉트 (현재 페이지가 로그인 페이지가 아닌 경우에만)
            if (window.location.pathname !== '/login') {
              window.location.href = '/login'
            }
          }
        }
      })
    }

    if (networkError) {
      console.error('Network error:', networkError)
    }
  })

  const uploadLink = createUploadLink({
    uri: 'http://main-practice.codebootcamp.co.kr/graphql',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const client = new ApolloClient({
    link: from([errorLink, uploadLink]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
