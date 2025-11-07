interface RegisterValue {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

interface RegisterErrors {
  email?: string
  name?: string
  password?: string
  passwordConfirm?: string
}

export const registerValidation = (value: RegisterValue): RegisterErrors => {
  const errors: RegisterErrors = {}
  if (!value.email.includes('@')) errors.email = '이메일 형식에 맞춰 입력해 주세요.'
  if (!value.email.trim()) errors.email = '이메일을 입력해 주세요.'
  if (!value.name.trim()) errors.name = '이름을 입력해 주세요.'
  if (!value.password.trim()) errors.password = '비밀번호를 입력해 주세요.'
  if (value.password.trim() !== value.passwordConfirm.trim())
    errors.passwordConfirm = '비밀번호와 일치하지 않습니다.'
  if (!value.passwordConfirm.trim()) errors.passwordConfirm = '비밀번호를 입력해 주세요.'

  return errors
}
