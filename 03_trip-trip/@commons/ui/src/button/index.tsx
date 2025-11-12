'use client'

import { FieldValues, FormState } from 'react-hook-form'
import styles from './styles.module.css'
import React from 'react'

type Button = 'submit' | 'button' | 'reset'
type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'small' | 'medium' | 'large'
type Theme = 'light' | 'dark'

interface IButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled' | 'className'> {
  type?: Button
  variant?: Variant
  size?: Size
  theme?: Theme
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  disabled?: boolean
  className?: string
}

/**
 * Button - Dumb Component
 * RHF에 대해 아무것도 모르는 순수한 버튼 컴포넌트
 */
export function Button(props: IButtonProps) {
  const {
    type = 'button',
    variant = 'primary',
    size = 'medium',
    theme = 'light',
    children,
    leftIcon,
    rightIcon,
    disabled = false,
    className = '',
    ...restProps
  } = props

  // 오른쪽 아이콘이 있는 경우 특별한 스타일 적용
  const hasRightIcon = !!rightIcon
  const hasLeftIcon = !!leftIcon

  const buttonClasses = [
    styles.base,
    styles[variant],
    styles[size],
    styles[theme],
    hasRightIcon && styles.rightIcon,
    hasLeftIcon && !hasRightIcon && styles.leftIcon,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={buttonClasses} disabled={disabled} {...restProps}>
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      {children && <span className={styles.label}>{children}</span>}
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  )
}

interface IFormButtonProps extends Omit<IButtonProps, 'disabled'> {
  formState?: FormState<FieldValues>
  disabled?: boolean
}

/**
 * FormButton - RHF 로직을 처리하는 Smart Component
 * RHF의 formState를 참고하여 disabled 여부를 계산하고 Button에 전달
 */
export function FormButton(props: IFormButtonProps) {
  const { formState, disabled: externalDisabled, ...buttonProps } = props

  // formState가 있으면 isValid를 체크하고, 없으면 externalDisabled 사용
  const isDisabled =
    externalDisabled !== undefined ? externalDisabled : formState ? !formState.isValid : false

  return <Button {...buttonProps} disabled={isDisabled} />
}
