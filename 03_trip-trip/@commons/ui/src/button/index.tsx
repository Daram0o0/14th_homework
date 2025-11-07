'use client'

import { FieldValues, FormState } from 'react-hook-form'
import styles from './styles.module.css'
import React from 'react'

type Button = 'submit' | 'button' | 'reset'
type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'small' | 'medium' | 'large'
type Theme = 'light' | 'dark'

interface IProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled' | 'className'> {
  type?: Button
  variant?: Variant
  size?: Size
  theme?: Theme
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  formState?: FormState<FieldValues>
  disabled?: boolean
  className?: string
}

export function Button(props: IProps) {
  const {
    type = 'button',
    variant = 'primary',
    size = 'medium',
    theme = 'light',
    children,
    leftIcon,
    rightIcon,
    formState,
    disabled: externalDisabled,
    className = '',
    ...restProps
  } = props

  const isDisabled =
    externalDisabled !== undefined ? externalDisabled : formState ? !formState.isValid : false

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
    isDisabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={buttonClasses} disabled={isDisabled} {...restProps}>
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      {children && <span className={styles.label}>{children}</span>}
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  )
}
