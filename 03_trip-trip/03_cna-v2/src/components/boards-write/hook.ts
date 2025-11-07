'use client'
import { ApolloError, useMutation, useQuery } from '@apollo/client'
import { useParams, useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BoardFormProps } from './types'
import {
  BoardAddressInput,
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
  FetchBoardsCountDocument,
  FetchBoardsDocument,
  UpdateBoardDocument,
  UpdateBoardInput,
  UpdateBoardMutation,
  UpdateBoardMutationVariables,
  UploadFileDocument,
  UploadFileMutation,
  UploadFileMutationVariables,
} from 'commons/graphql/graphql'
import { Address } from 'react-daum-postcode'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkValidationFile } from 'commons/libraries/validation/image-validation'
import { Modal } from 'antd'

export const boardSchema = z.object({
  writer: z.string().min(1, { message: '작성자를 입력해 주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8 ~ 16자까지 입력해주세요.' })
    .max(16, { message: '비밀번호는 8 ~ 16자까지 입력해주세요.' })
    .optional()
    .or(z.literal('')),
  title: z.string().min(2, { message: '제목은 2자 이상 입력해 주세요.' }),
  contents: z.string().min(1, { message: '내용을 입력해 주세요.' }),
  youtubeUrl: z.string().url({ message: '유효한 URL을 입력해주세요.' }).optional(),
  images: z.array(z.string()).optional(),
})

export default function useBoardForm(props: BoardFormProps) {
  const router = useRouter()
  const params = useParams()
  const editId = props.isEdit && typeof params.boardId === 'string' ? params.boardId : ''

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(boardSchema),
    mode: 'onChange',
  })

  const { data } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(FetchBoardDocument, {
    variables: { boardId: editId },
    skip: !props.isEdit,
  })

  //그래프큐엘 셋팅
  const [createBoard] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
    CreateBoardDocument,
    {
      refetchQueries: [
        { query: FetchBoardsDocument, variables: { search: '' } },
        { query: FetchBoardsCountDocument, variables: { search: '' } },
      ],
    }
  )
  const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(
    UpdateBoardDocument,
    {
      refetchQueries: [
        { query: FetchBoardsDocument, variables: { search: '' } },
        { query: FetchBoardsCountDocument, variables: { search: '' } },
        { query: FetchBoardDocument, variables: { boardId: editId } },
      ],
    }
  )

  useEffect(() => {
    if (data?.fetchBoard) {
      const { writer, title, contents, youtubeUrl, images } = data.fetchBoard
      reset({
        writer: writer ?? '',
        title: title ?? '',
        contents: contents ?? '',
        youtubeUrl: youtubeUrl ?? '',
        images: images ?? ['', '', ''],
      })

      if (data?.fetchBoard.boardAddress) {
        const { zipcode, address, addressDetail } = data.fetchBoard.boardAddress
        setAddress({
          zipcode: zipcode ?? '',
          base: address ?? '',
          detail: addressDetail ?? '',
        })
      }
    }
  }, [data, reset])
  // data랑 reset왜 하는겨

  const [address, setAddress] = useState({
    zipcode: '',
    base: '',
    detail: '',
  })

  // 모달 + 우편번호
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const images = watch('images', [])

  const fileRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const [uploadFile] = useMutation<UploadFileMutation, UploadFileMutationVariables>(
    UploadFileDocument
  )

  const onClickImagebyIdx = (idx: number) => {
    fileRefs[idx].current?.click()
  }

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isValid = checkValidationFile(file)
    if (!isValid) return

    try {
      const { data } = await uploadFile({ variables: { file } })
      const url = data?.uploadFile?.url ?? ''
      setImageByIndex(idx, url)
    } catch (error) {
      if (error instanceof ApolloError) {
        Modal.error({ content: error.message })
      }
    }
  }

  const onClickDelete = (idx: number) => {
    setImageByIndex(idx, '')
  }

  const handleComplete = (data: Address) => {
    const base = data.address || data.roadAddress || data.jibunAddress || ''

    setAddress({
      ...address,
      zipcode: data.zonecode || '',
      base,
      detail: '',
    })
    onToggleModal()
  }

  // // 변경값 상태관리
  // const onChangeValue = (
  //   event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   const { id, value } = event.target
  //   setBoardValue({
  //     ...boardValue,
  //     [id]: value,
  //   })
  // }

  // // image index에 일치하게 업로드
  const setImageByIndex = (idx: number, url: string) => {
    const currentImages = watch('images') || ['', '', '']
    const newImages = [...currentImages]
    newImages[idx] = url
    setValue('images', newImages, { shouldValidate: true })
  }

  const onSubmit = async (formData: z.infer<typeof boardSchema>) => {
    if (props.isEdit) {
      const updateInput: UpdateBoardInput = {}

      if (dirtyFields.title) updateInput.title = formData.title
      if (dirtyFields.contents) updateInput.contents = formData.contents
      if (dirtyFields.youtubeUrl) updateInput.youtubeUrl = formData.youtubeUrl
      if (dirtyFields.images) updateInput.images = formData.images

      const boardAddress: BoardAddressInput = {}
      if (address.zipcode !== data?.fetchBoard?.boardAddress?.zipcode)
        boardAddress.zipcode = address.zipcode
      if (address.base !== data?.fetchBoard?.boardAddress?.address)
        boardAddress.address = address.base
      if (address.detail !== data?.fetchBoard?.boardAddress?.addressDetail)
        boardAddress.addressDetail = address.detail

      if (Object.keys(boardAddress).length > 0) {
        updateInput.boardAddress = boardAddress
      }

      if (Object.keys(updateInput).length === 0) {
        return Modal.warning({ content: '수정된 내용이 없습니다.' })
      }

      const password = prompt('비밀번호를 입력해주세요.')

      if (password === null || password.trim() === '') {
        Modal.error({ content: '비밀번호를 입력해야 수정이 가능합니다.' })
        return
      }

      try {
        await updateBoard({
          variables: {
            boardId: editId,
            updateBoardInput: updateInput,
            password,
          },
          refetchQueries: [
            { query: FetchBoardsDocument, variables: { page: 1, search: '' } },
            { query: FetchBoardsCountDocument, variables: { search: '' } },
            { query: FetchBoardDocument, variables: { boardId: editId } },
          ],
        })
        Modal.success({ content: '게시글이 수정되었습니다!' })
        router.push(`/boards/${editId}`)
      } catch (error) {
        if (error instanceof ApolloError) {
          Modal.error({ content: error.message })
        }
      }
    }

    if (!props.isEdit) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              ...formData,
              boardAddress: {
                zipcode: address.zipcode,
                address: address.base,
                addressDetail: address.detail,
              },
            },
          },
          refetchQueries: [
            { query: FetchBoardsDocument, variables: { page: 1, search: '' } },
            { query: FetchBoardsCountDocument, variables: { search: '' } },
          ],
        })
        Modal.success({ content: '게시글이 등록되었습니다!' })
        router.push(`/boards/${result.data?.createBoard._id}`)
      } catch (error) {
        if (error instanceof ApolloError) {
          Modal.error({ content: error.message })
        }
      }
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return {
    isEdit: props.isEdit,
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
    handleCancel,
    address,
    setAddress,
    isModalOpen,
    onToggleModal,
    handleComplete,
    images,
    setImageByIndex,
    fileRefs,
    onClickImagebyIdx,
    onChangeFile,
    onClickDelete,
  }
}
