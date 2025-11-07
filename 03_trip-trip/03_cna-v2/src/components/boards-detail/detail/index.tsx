'use client'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import ReactPlayer from 'react-player'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './styles.module.css'
import profileImage from '@assets/profile_image.png'
import {
  DislikeBoardDocument,
  DislikeBoardMutation,
  DislikeBoardMutationVariables,
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
  LikeBoardDocument,
  LikeBoardMutation,
  LikeBoardMutationVariables,
} from 'commons/graphql/graphql'
import {
  HeartBrokenOutlined,
  FavoriteBorderOutlined,
  LinkOutlined,
  PlaceOutlined,
  MenuOutlined,
  EditOutlined,
} from '@mui/icons-material'
import { Tooltip } from 'antd'
import { formatDate } from 'commons/utils/formatDate'
import { Button } from '@commons/ui'

const IMAGE_SRC = {
  profileImage: {
    src: profileImage,
    alt: '프로필이미지',
  },
} as const

export default function BoardDetailPage() {
  const router = useRouter()
  const params = useParams()
  const boardId = typeof params.boardId === 'string' ? params.boardId : ''

  const { data } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(FetchBoardDocument, {
    variables: { boardId },
  })

  const goToEditPage = () => {
    router.push(`${boardId}/edit`)
  }

  const goToBoardsPage = () => {
    router.push(`/boards`)
  }

  const [likeBoard] = useMutation<LikeBoardMutation, LikeBoardMutationVariables>(LikeBoardDocument)
  const [dislikeBoard] = useMutation<DislikeBoardMutation, DislikeBoardMutationVariables>(
    DislikeBoardDocument
  )

  const onClickLike = async () => {
    await likeBoard({
      variables: { boardId },
      refetchQueries: [{ query: FetchBoardDocument, variables: { boardId } }],
    })
  }

  const onClickDisLike = async () => {
    await dislikeBoard({
      variables: { boardId },
      refetchQueries: [{ query: FetchBoardDocument, variables: { boardId } }],
    })
  }
  return (
    <div className={styles.detailFrame}>
      <div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
      <div className={styles.detailMetadataContainer}>
        <div className={styles.detailMetadataProfile}>
          <Image src={IMAGE_SRC.profileImage.src} alt={IMAGE_SRC.profileImage.alt} />
          <div> {data?.fetchBoard?.writer}</div>
        </div>
        <div className={styles.detailMetadataDate}>{formatDate(data?.fetchBoard?.createdAt)}</div>
      </div>
      <div className={styles.enrollBorder}></div>
      <div className={styles.detailMetadataIconContainer}>
        <LinkOutlined />

        <Tooltip
          placement="bottomRight"
          title={data?.fetchBoard?.boardAddress?.address}
          arrow={false}
          color="white"
          overlayInnerStyle={{ color: 'black' }}
        >
          <PlaceOutlined />
        </Tooltip>
      </div>
      <div className={styles.detailContentContainer}>
        {data?.fetchBoard?.images &&
          data?.fetchBoard?.images?.map((image, idx) => {
            const isUrl = image !== ''
            return (
              <div key={idx}>
                {isUrl && (
                  <Image
                    src={`https://storage.googleapis.com/${image}`}
                    alt={'불러온 사진'}
                    width={400}
                    height={0}
                    className={styles.detailContentImage}
                  />
                )}
              </div>
            )
          })}

        <div className={styles.detailContentText}>{data?.fetchBoard?.contents}</div>
        {data?.fetchBoard?.youtubeUrl && (
          <div className={styles.youtube}>
            <ReactPlayer src={data?.fetchBoard?.youtubeUrl} controls width={822} height={464} />
          </div>
        )}

        <div className={styles.detailContentGoodOrBad}>
          <div className={styles.detailGoodContainer}>
            <HeartBrokenOutlined style={{ color: '#5F5F5F' }} onClick={onClickDisLike} />
            <div className={styles.detailBadText}>{data?.fetchBoard?.dislikeCount}</div>
          </div>
          <div className={styles.detailGoodContainer}>
            <FavoriteBorderOutlined style={{ color: '#F66A6A' }} onClick={onClickLike} />
            <div className={styles.detailGoodText}>{data?.fetchBoard?.likeCount}</div>
          </div>
        </div>
        <div className={styles.detailButtonsContainer}>
          <Button
            onClick={goToBoardsPage}
            leftIcon={<MenuOutlined />}
            variant="outline"
            size="small"
            theme="light"
          >
            목록으로
          </Button>
          <Button
            onClick={goToEditPage}
            leftIcon={<EditOutlined />}
            variant="outline"
            size="small"
            theme="light"
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  )
}
