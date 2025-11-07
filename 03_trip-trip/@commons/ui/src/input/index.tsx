import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input 상태 */
  status?: 'filled' | 'error' | 'selected&typing' | 'disabled' | 'read-only' | 'enabled'
  /** Input 크기 */
  size?: 's' | 'm'
  /** 내용 채워짐 여부 */
  filled?: 'on' | 'off'
  /** 레이블 텍스트 */
  label?: string
  /** 필수 입력 여부 */
  required?: boolean
  /** 에러 메시지 */
  errorMessage?: string
  /** 버튼 표시 여부 */
  showButton?: boolean
  /** 버튼 텍스트 */
  buttonText?: string
  /** 버튼 클릭 핸들러 */
  onButtonClick?: () => void
}

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Textarea 상태 */
  status?: 'filled' | 'error' | 'selected&typing' | 'disabled' | 'read-only' | 'enabled'
  /** Textarea 크기 */
  size?: 's' | 'm'
  /** 내용 채워짐 여부 */
  filled?: 'on' | 'off'
  /** 레이블 텍스트 */
  label?: string
  /** 필수 입력 여부 */
  required?: boolean
  /** 에러 메시지 */
  errorMessage?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      status = 'enabled',
      size = 'm',
      filled = 'off',
      label,
      required = false,
      errorMessage,
      showButton = false,
      buttonText = '우편번호 검색',
      onButtonClick,
      className,
      disabled,
      readOnly,
      value,
      ...props
    },
    ref
  ) => {
    // status에 따른 실제 HTML 속성 설정
    const isDisabled = status === 'disabled' || disabled
    const isReadOnly = status === 'read-only' || readOnly
    const hasError = status === 'error'
    const isFilled = filled === 'on' || (value && String(value).length > 0)

    // 동적 클래스 생성
    const containerClass = [styles.container, styles[`size-${size}`], className]
      .filter(Boolean)
      .join(' ')

    const inputWrapperClass = [
      styles.inputWrapper,
      styles[`status-${status}`],
      isFilled && styles.filled,
      hasError && styles.error,
    ]
      .filter(Boolean)
      .join(' ')

    const inputClass = [styles.input, styles[`size-${size}`]].filter(Boolean).join(' ')

    return (
      <div className={containerClass}>
        {/* 레이블 영역 */}
        {label && (
          <div className={styles.labelArea}>
            <span className={styles.label}>{label}</span>
            {required && <span className={styles.required}>*</span>}
          </div>
        )}

        {/* 인풋 영역 */}
        <div className={styles.inputArea}>
          <div className={inputWrapperClass}>
            <input
              ref={ref}
              className={inputClass}
              disabled={isDisabled}
              readOnly={isReadOnly}
              value={value}
              {...props}
            />
          </div>

          {/* 버튼 */}
          {showButton && (
            <button
              type="button"
              className={`${styles.button} ${styles[`button-${size}`]}`}
              onClick={onButtonClick}
              disabled={isDisabled}
            >
              {buttonText}
            </button>
          )}
        </div>

        {/* 에러 메시지 */}
        {hasError && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      status = 'enabled',
      size = 'm',
      filled = 'off',
      label,
      required = false,
      errorMessage,
      className,
      disabled,
      readOnly,
      value,
      ...props
    },
    ref
  ) => {
    // status에 따른 실제 HTML 속성 설정
    const isDisabled = status === 'disabled' || disabled
    const isReadOnly = status === 'read-only' || readOnly
    const hasError = status === 'error'
    const isFilled = filled === 'on' || (value && String(value).length > 0)

    // 동적 클래스 생성
    const containerClass = [styles.container, styles[`size-${size}`], className]
      .filter(Boolean)
      .join(' ')

    const textareaWrapperClass = [
      styles.textareaWrapper,
      styles[`status-${status}`],
      isFilled && styles.filled,
      hasError && styles.error,
    ]
      .filter(Boolean)
      .join(' ')

    const textareaClass = [styles.textarea, styles[`size-${size}`]].filter(Boolean).join(' ')

    return (
      <div className={containerClass}>
        {/* 레이블 영역 */}
        {label && (
          <div className={styles.labelArea}>
            <span className={styles.label}>{label}</span>
            {required && <span className={styles.required}>*</span>}
          </div>
        )}

        {/* Textarea 영역 */}
        <div className={styles.textareaArea}>
          <div className={textareaWrapperClass}>
            <textarea
              ref={ref}
              className={textareaClass}
              disabled={isDisabled}
              readOnly={isReadOnly}
              value={value}
              {...props}
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        {hasError && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
