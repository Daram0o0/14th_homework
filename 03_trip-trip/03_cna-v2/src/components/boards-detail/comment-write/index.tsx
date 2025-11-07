'use client'

import styles from './styles.module.css'
import { ChatBubbleOutlineOutlined } from '@mui/icons-material'
import { CommentWriteProps } from './types'
import useCommentWrite from './hook'
import { Rate } from 'antd'
import { Button, Input, Textarea } from '@commons/ui'

export default function CommentWriteComponent(props: CommentWriteProps) {
  const { isEdit = false, boardId, onClickEdit, el } = props
  const {
    handleChangeWriter,
    handleChangePassword,
    handleChangeContents,
    handleChangeRating,
    handleSubmit,
    handleChange,
    isDisabled,
    writer,
    password,
    contents,
    rating,
  } = useCommentWrite({ boardId, el, onClickEdit })

  return (
    <div className={styles.comment_layout}>
      <div className={styles.comment_title}>
        <ChatBubbleOutlineOutlined />
        <p>댓글</p>
      </div>
      <Rate onChange={handleChangeRating} value={rating} />
      {/* 인풋3개 들어가는 곳 */}
      <div className={styles.comment_inputs}>
        {/* 위에 인풋 2개 */}
        <div className={styles.comment_inputs_top}>
          <Input
            label="작성자"
            required={true}
            size="m"
            placeholder="작성자 명을 입력해 주세요."
            onChange={handleChangeWriter}
            value={writer}
            readOnly={isEdit}
            status={isEdit ? 'read-only' : 'enabled'}
          />
          <Input
            label="비밀번호"
            required={true}
            size="m"
            placeholder="비밀번호를 입력해 주세요."
            onChange={handleChangePassword}
            value={password}
          />
        </div>
        {/* 아래에 인풋 1개 */}
        <Textarea
          required={true}
          size="m"
          placeholder="댓글을 입력해 주세요."
          onChange={handleChangeContents}
          value={contents}
          maxLength={100}
        />
        <div className={styles.active_buttons}>
          {isEdit ? (
            <>
              <Button className={styles.enroll_cancel_button} onClick={onClickEdit}>
                취소
              </Button>
              <Button type="submit" disabled={isDisabled} onClick={handleChange}>
                수정 하기
              </Button>
            </>
          ) : (
            <Button
              className={styles.enroll_submit_button}
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              댓글 등록
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
