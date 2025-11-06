'use client'
import { Button, Input } from '@commons/ui'
import { useRegister } from './hook'
import styles from './styles.module.css'
export default function RegisterForm() {
  const { errors, registerValue, handleChange, handleSubmit, SuccessModal } = useRegister()

  return (
    <>
      <form className={styles.formLayout} onSubmit={handleSubmit}>
        <h2 className={styles.title}>회원가입</h2>
        <div className={styles.main}>
          <p>회원가입을 위해 아래 빈칸을 모두 채워 주세요.</p>
          <div className={styles.inputWrapper}>
            {/* 이메일 */}
            {/* <div className={`${styles.inputBlock} ${errors.email ? styles.error : ''}`}> */}
            <Input
              label="이메일"
              required={true}
              placeholder="이메일을 입력해 주세요"
              onChange={handleChange}
              id="email"
              value={registerValue.email}
              errorMessage={errors.email}
              status={errors.email ? 'error' : 'enabled'}
            />

            <Input
              label="이름"
              required={true}
              placeholder="이름을 입력해 주세요"
              onChange={handleChange}
              id="name"
              value={registerValue.name}
              errorMessage={errors.name}
              status={errors.name ? 'error' : 'enabled'}
            />

            <Input
              label="비밀번호"
              required={true}
              placeholder="비밀번호를 입력해 주세요"
              onChange={handleChange}
              id="password"
              value={registerValue.password}
              errorMessage={errors.password}
              status={errors.password ? 'error' : 'enabled'}
            />
            {/* 비밀번호 확인*/}
            <Input
              label="비밀번호 확인"
              required={true}
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={handleChange}
              id="passwordConfirm"
              value={registerValue.passwordConfirm}
              errorMessage={errors.passwordConfirm}
              status={errors.passwordConfirm ? 'error' : 'enabled'}
            />
          </div>
        </div>
        <Button type="submit">회원가입</Button>
      </form>
      <SuccessModal />
    </>
  )
}
