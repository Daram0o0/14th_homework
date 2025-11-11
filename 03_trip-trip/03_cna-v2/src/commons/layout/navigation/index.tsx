'use client'
import Image from 'next/image'
import triptripLogo from '@assets/triptrip.svg'
import styles from './styles.module.css'
import Link from 'next/link'
import { ChevronRight, ArrowDropDown } from '@mui/icons-material'
import { ApolloError, useMutation, useQuery } from '@apollo/client'
import {
  FetchUserLoggedInDocument,
  FetchUserLoggedInQuery,
  FetchUserLoggedInQueryVariables,
  LogoutUserDocument,
  LogoutUserMutation,
  LogoutUserMutationVariables,
} from 'commons/graphql/graphql'
import { useRouter } from 'next/navigation'
import { Dropdown, MenuProps, Space } from 'antd'
import ProfileImage from 'assets/profiles/profile5.webp'
import { useActiveNavigation } from './hook'

export default function Navigation() {
  const { data, error } = useQuery<FetchUserLoggedInQuery, FetchUserLoggedInQueryVariables>(
    FetchUserLoggedInDocument
  )
  const { isBoardsActive, isProductsActive, isMypageActive } = useActiveNavigation()

  const [logoutUser] = useMutation<LogoutUserMutation, LogoutUserMutationVariables>(
    LogoutUserDocument
  )
  const isLoggedIn = !!data?.fetchUserLoggedIn && !error
  const router = useRouter()
  const handleNavigate = () => {
    router.push('/login')
  }

  const handleLogout = async () => {
    try {
      const { data } = await logoutUser()
      if (data?.logoutUser) {
        localStorage.removeItem('accessToken')
        alert('로그아웃 되었습니다.')
        router.push('/login')
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        alert(error.message)
      }
      console.error(error)
    }
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
      // disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: '로그아웃',
      onClick: handleLogout,
      // extra: '⌘P',
    },
  ]

  return (
    <header className={styles.navigation}>
      <div className={styles.active_btns}>
        <Image src={triptripLogo} alt="triptrip_logo" width={51.52} />
        <ul className={styles.menu}>
          <li className={isBoardsActive ? styles.active : ''}>
            <Link href={'/boards'}>트립토크</Link>
          </li>
          <li className={isProductsActive ? styles.active : ''}>
            <Link href={'/products'}>숙박권 구매</Link>
          </li>
          <li className={isMypageActive ? styles.active : ''}>
            <Link href={'/mypage'}>마이 페이지</Link>
          </li>
        </ul>
      </div>

      {isLoggedIn ? (
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Image src={ProfileImage} width={40} height={40} alt="avatar" />
              {data?.fetchUserLoggedIn?.name}
              <ArrowDropDown />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <button className={styles.login_btn} onClick={handleNavigate}>
          <p>로그인</p>
          <ChevronRight />
        </button>
      )}
    </header>
  )
}
