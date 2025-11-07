'use client'
import { ChangeEvent, useState } from 'react'
import { ApolloError, useMutation } from '@apollo/client'
import {
  CreateBoardCommentDocument,
  CreateBoardCommentMutation,
  CreateBoardCommentMutationVariables,
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
  UpdateBoardCommentMutation,
  UpdateBoardCommentMutationVariables,
} from 'commons/graphql/graphql'
import { UseCommentWriteProps } from './types'
import { Modal } from 'antd'

export default function useCommentWrite(props: UseCommentWriteProps) {
  const { boardId, el, onClickEdit } = props

  const [createBoardComment] = useMutation<
    CreateBoardCommentMutation,
    CreateBoardCommentMutationVariables
  >(CreateBoardCommentDocument)

  const [updateBoardComment] = useMutation<
    UpdateBoardCommentMutation,
    UpdateBoardCommentMutationVariables
  >(UpdateBoardCommentDocument)

  const [writer, setWriter] = useState(el?.writer ?? '')
  const [password, setPassword] = useState('')
  const [contents, setContents] = useState(el?.contents ?? '')
  const [rating, setRating] = useState(el?.rating ?? 0)

  const handleChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value)
  }
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }
  const handleChangeRating = (value: number) => {
    setRating(value)
  }

  const handleSubmit = async () => {
    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating,
          },
          boardId,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { boardId },
          },
        ],
      })
      setWriter('')
      setPassword('')
      setContents('')
      setRating(0)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = async () => {
    try {
      await updateBoardComment({
        variables: {
          updateBoardCommentInput: {
            contents,
            rating,
          },
          password,
          boardCommentId: el?._id ?? '',
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { boardId },
          },
        ],
      })
      onClickEdit?.()
    } catch (error) {
      if (error instanceof ApolloError) {
        Modal.error({
          content: error?.message ?? '수정에 실패했습니다.',
        })
      }
    }
  }

  const isDisabled = !writer || !password || !contents || !rating

  return {
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
  }
}
