'use client'
import Logo from 'assets/triptrip.svg'
import Image from 'next/image'
import styles from './styles.module.css'
import { useLogin } from './hook'
import { useRouter } from 'next/navigation'
import { Input } from '@commons/ui'
import { Button } from '@commons/ui'

export default function LoginForm() {
  const router = useRouter()
  const handleNavigate = () => {
    router.push('/register')
  }
  const { isError, loginValue, handleChange, handleSubmit } = useLogin()

  return (
    <form className={styles.formLayout} onSubmit={handleSubmit}>
      <Image src={Logo} alt={'triptrip 로고'} width={120} height={0} />
      <h2 className={styles.title}>트립트립에 오신걸 환영합니다.</h2>
      <div className={styles.main}>
        <p>트립트립에 로그인 하세요.</p>
        <div className={styles.inputs}>
          <div className={`${styles.inputWrapper} ${isError ? styles.error : ''}`}>
            {/* 이메일 인풋 */}
            <Input
              placeholder="이메일을 입력해 주세요."
              onChange={handleChange}
              name="email"
              value={loginValue.email}
            />
            {/* 비밀번호 인풋 */}
            <Input
              placeholder="비밀번호를 입력해 주세요."
              onChange={handleChange}
              name="password"
              value={loginValue.password}
            />
          </div>
          {isError && <p>아이디 또는 비밀번호를 확인해 주세요.</p>}
        </div>
      </div>
      <Button type="submit">로그인</Button>
      <p onClick={handleNavigate}>회원가입</p>
    </form>
  )
}
