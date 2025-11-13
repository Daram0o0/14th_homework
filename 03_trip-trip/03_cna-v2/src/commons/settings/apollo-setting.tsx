'use client'

import { ApolloClient, ApolloProvider, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { useAccessTokenStore } from 'commons/stores/access-token-store'
import { useAuthExpiryStore } from 'commons/stores/auth-expiry-store'
import { useEffect } from 'react'

interface IApolloSetting {
  children: React.ReactNode
}

export default function ApiProvider({ children }: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore()
  const { handleTokenExpiry } = useAuthExpiryStore()

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
          // 중앙 집중식 토큰 만료 처리
          setAccessToken('')
          handleTokenExpiry()
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
