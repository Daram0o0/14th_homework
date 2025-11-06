'use client'

import { ApolloError, useMutation } from '@apollo/client'
import { Modal } from 'antd'
import {
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,
} from 'commons/graphql/graphql'
import { registerValidation } from 'commons/libraries/validation/register-validation'
import { isEmptyObj } from 'commons/utils/isEmptyObj'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import triptripLogo from 'assets/triptrip.svg'
import Image from 'next/image'
const initialState = {
  email: '',
  name: '',
  password: '',
  passwordConfirm: '',
}

type RegisterErrors = {
  email?: string
  name?: string
  password?: string
  passwordConfirm?: string
}

export const useRegister = () => {
  const router = useRouter()
  const [registerValue, setRegisterValue] = useState(initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errors, setErrors] = useState<RegisterErrors>({})

  const [createUser] = useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setRegisterValue((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = registerValidation(registerValue) as RegisterErrors
    setErrors(nextErrors)
    if (!isEmptyObj(nextErrors)) return

    try {
      const { data } = await createUser({
        variables: {
          createUserInput: {
            email: registerValue.email,
            name: registerValue.name,
            password: registerValue.password,
          },
        },
      })
      if (data?.createUser?._id) {
        setIsModalOpen(true)
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        alert(error?.message)
      }
      console.error('회원가입에 실패하였습니다:', error)
    }
  }

  const SuccessModal = () => (
    <Modal
      open={isModalOpen}
      footer={null}
      closable={false} // 닫기 버튼 제거
      centered
      onCancel={() => setIsModalOpen(false)}
    >
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>회원가입을 축하 드려요.</p>
        <Image src={triptripLogo} alt="triptrip logo" width={100} style={{ margin: '0 auto' }} />
        <button
          style={{
            marginTop: '20px',
            backgroundColor: '#1677ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsModalOpen(false)
            router.push('/login')
          }}
        >
          로그인 하기
        </button>
      </div>
    </Modal>
  )

  return { 
    errors, 
    registerValue, 
    handleChange, 
    handleSubmit, 
    SuccessModal 
  } as {
    errors: RegisterErrors
    registerValue: typeof initialState
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
    SuccessModal: () => JSX.Element
  }
}
