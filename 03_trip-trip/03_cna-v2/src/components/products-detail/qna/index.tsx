'use client'
import { useState } from 'react'
import styles from './styles.module.css'
import { Textarea } from '@commons/ui'
import { Button } from '@commons/ui'
import {
  EditOutlined,
  DeleteOutlined,
  SendOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
  ChatBubbleOutlineOutlined,
} from '@mui/icons-material'
import Image from 'next/image'
import profileImage from '@assets/profiles/profile5.webp'

// 임시 데이터 타입
interface Inquiry {
  id: string
  author: string
  authorImage?: string
  isMine: boolean
  isPublic: boolean
  content: string
  createdAt: string
  replies?: Reply[]
}

interface Reply {
  id: string
  author: string
  authorImage?: string
  isSeller: boolean
  content: string
  createdAt: string
}

// 임시 데이터
const mockInquiries: Inquiry[] = [
  {
    id: '1',
    author: '나',
    isMine: true,
    isPublic: false,
    content: '123123',
    createdAt: '방금 전',
    replies: [],
  },
  {
    id: '2',
    author: '나',
    isMine: true,
    isPublic: true,
    content: '문의 테스트',
    createdAt: '방금 전',
    replies: [
      {
        id: 'r1',
        author: '나',
        isSeller: false,
        content: '테스트 답변',
        createdAt: '방금 전',
      },
      {
        id: 'r2',
        author: '나',
        isSeller: false,
        content: '테스트 답변',
        createdAt: '방금 전',
      },
    ],
  },
  {
    id: '3',
    author: '김민지',
    isMine: false,
    isPublic: true,
    content: '6인 이하라고 하셨는데, 정확히 몇 명까지 숙박 가능한가요?',
    createdAt: '2시간 전',
    replies: [
      {
        id: 'r3',
        author: '김상훈',
        isSeller: true,
        content: '최대 6명까지 가능합니다. 침실이 3개 있어서 편하게 이용하실 수 있습니다.',
        createdAt: '1시간 전',
      },
      {
        id: 'r4',
        author: '김민지',
        isSeller: false,
        content: '감사합니다! 침대 크기도 궁금한데 어떻게 되나요?',
        createdAt: '52분 전',
      },
    ],
  },
]

interface QnAComponentProps {
  onTabChange?: (tab: 'detail' | 'qna') => void
}

export default function QnAComponent({ onTabChange }: QnAComponentProps) {
  const [inquiryText, setInquiryText] = useState('')
  const [isPublicToggle, setIsPublicToggle] = useState(true)
  const [isMyInquiryOnly, setIsMyInquiryOnly] = useState(false)
  const [hiddenReplies, setHiddenReplies] = useState<Set<string>>(new Set())

  const handleInquirySubmit = () => {
    // TODO: 실제 API 호출
    console.log('문의 제출:', { content: inquiryText, isPublic: isPublicToggle })
    setInquiryText('')
  }

  const toggleReplyVisibility = (inquiryId: string) => {
    const newHidden = new Set(hiddenReplies)
    if (newHidden.has(inquiryId)) {
      newHidden.delete(inquiryId)
    } else {
      newHidden.add(inquiryId)
    }
    setHiddenReplies(newHidden)
  }

  // 필터링된 문의 목록
  const filteredInquiries = mockInquiries.filter((inquiry) => {
    if (isMyInquiryOnly && !inquiry.isMine) return false
    // TODO: 다른 필터 조건들 추가
    return true
  })

  return (
    <div className={styles.container}>
      {/* 탭 영역 (1280 x 49) */}
      <div className={styles.tabContainer}>
        <div className={styles.tabButton} onClick={() => onTabChange?.('detail')}>
          <span className={styles.tabTextInactive}>상세 정보</span>
        </div>
        <div className={styles.tabButton} onClick={() => onTabChange?.('qna')}>
          <span className={styles.tabTextActive}>문의하기</span>
          <div className={styles.tabIndicator}></div>
        </div>
      </div>

      {/* gap (1280 x 40) */}
      <div className={styles.gap}></div>

      {/* 문의 작성 폼 카드 */}
      <div className={styles.writeCard}>
        <div className={styles.writeCardContent}>
          {/* 새 문의 작성 헤더 */}
          <div className={styles.writeHeader}>
            <div className={styles.writeTitleContainer}>
              <h3 className={styles.writeTitle}>새 문의 작성</h3>
            </div>
            <div className={styles.publicToggleContainer}>
              <label className={styles.toggleLabel}>{isPublicToggle ? '공개' : '비공개'}</label>
              <button
                className={`${styles.toggleButton} ${
                  isPublicToggle ? styles.toggleButtonActive : ''
                }`}
                onClick={() => setIsPublicToggle(!isPublicToggle)}
                type="button"
              >
                <span className={styles.toggleThumb}></span>
              </button>
            </div>
          </div>

          {/* Textarea 영역 */}
          <div className={styles.textareaSection}>
            <Textarea
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
              placeholder="판매자에게 궁금한 점을 문의해 주세요..."
              maxLength={500}
              className={styles.textarea}
            />
            <div className={styles.textareaFooter}>
              <span className={styles.charCount}>{inquiryText.length}/500</span>
              <Button
                variant="primary"
                size="small"
                theme="light"
                leftIcon={<SendOutlined />}
                onClick={handleInquirySubmit}
                disabled={!inquiryText.trim()}
                className={styles.submitButton}
              >
                문의하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* gap (1280 x 40) */}
      <div className={styles.gap}></div>

      {/* 문의 내역 헤더 */}
      <div className={styles.inquiryListHeader}>
        <div className={styles.inquiryListTitleContainer}>
          <h3 className={styles.inquiryListTitle}>문의 내역</h3>
          <div className={styles.inquiryCountBadge}>
            <span>{filteredInquiries.length}건</span>
          </div>
        </div>
        <div className={styles.myInquiryToggleContainer}>
          <label className={styles.toggleLabel}>내 문의만</label>
          <button
            className={`${styles.toggleButton} ${isMyInquiryOnly ? styles.toggleButtonActive : ''}`}
            onClick={() => setIsMyInquiryOnly(!isMyInquiryOnly)}
            type="button"
          >
            <span className={styles.toggleThumb}></span>
          </button>
        </div>
      </div>

      {/* 문의 목록 */}
      <div className={styles.inquiryList}>
        {filteredInquiries.length === 0 ? (
          <div className={styles.emptyState}>
            <p>문의가 없습니다.</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              isRepliesHidden={hiddenReplies.has(inquiry.id)}
              onToggleReplies={() => toggleReplyVisibility(inquiry.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

// 문의 카드 컴포넌트
function InquiryCard({
  inquiry,
  isRepliesHidden,
  onToggleReplies,
}: {
  inquiry: Inquiry
  isRepliesHidden: boolean
  onToggleReplies: () => void
}) {
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false)
  const [replyText, setReplyText] = useState('')

  const handleReplySubmit = () => {
    // TODO: 실제 API 호출
    console.log('답변 제출:', { inquiryId: inquiry.id, content: replyText })
    setReplyText('')
    setIsReplyFormOpen(false)
  }

  const handleCancelReply = () => {
    setReplyText('')
    setIsReplyFormOpen(false)
  }

  return (
    <div className={styles.inquiryCard}>
      <div className={styles.inquiryCardContent}>
        {/* 문의 내용 영역 */}
        <div className={styles.inquiryContent}>
          <div className={styles.inquiryHeader}>
            <div className={styles.inquiryAuthorInfo}>
              <Image
                src={profileImage}
                alt={inquiry.author}
                width={40}
                height={40}
                className={styles.authorImage}
              />
              <div className={styles.inquiryMeta}>
                <div className={styles.inquiryMetaTop}>
                  <span className={styles.authorName}>{inquiry.author}</span>
                  {inquiry.isMine && (
                    <div className={styles.badgeMine}>
                      <span>내 문의</span>
                    </div>
                  )}
                  {!inquiry.isPublic && (
                    <div className={styles.badgePrivate}>
                      <VisibilityOffOutlined className={styles.badgeIcon} />
                      <span>비공개</span>
                    </div>
                  )}
                  <span className={styles.createdAt}>{inquiry.createdAt}</span>
                </div>
                <p className={styles.inquiryText}>{inquiry.content}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 답변 영역 */}
        {inquiry.replies && inquiry.replies.length > 0 && (
          <div className={styles.repliesSection}>
            {!isRepliesHidden && (
              <>
                <button
                  className={styles.hideRepliesButton}
                  onClick={onToggleReplies}
                  type="button"
                >
                  <VisibilityOffOutlined />
                  <span>답변 숨기기</span>
                </button>
                <div className={styles.repliesList}>
                  {inquiry.replies.map((reply, index) => (
                    <div
                      key={reply.id}
                      className={`${styles.replyItem} ${
                        index > 0 ? styles.replyItemWithBorder : ''
                      }`}
                    >
                      <div className={styles.replyContent}>
                        <Image
                          src={profileImage}
                          alt={reply.author}
                          width={32}
                          height={32}
                          className={styles.replyAuthorImage}
                        />
                        <div className={styles.replyMeta}>
                          <div className={styles.replyMetaTop}>
                            <span className={styles.replyAuthorName}>{reply.author}</span>
                            {reply.isSeller && (
                              <div className={styles.badgeSeller}>
                                <span>판매자</span>
                              </div>
                            )}
                            <span className={styles.replyCreatedAt}>{reply.createdAt}</span>
                          </div>
                          <p className={styles.replyText}>{reply.content}</p>
                        </div>
                        <div className={styles.replyActions}>
                          <button className={styles.replyActionButton} type="button">
                            <EditOutlined />
                          </button>
                          <button className={styles.replyActionButton} type="button">
                            <DeleteOutlined />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {isRepliesHidden && !isReplyFormOpen && (
              <>
                <button
                  className={styles.showRepliesButton}
                  onClick={onToggleReplies}
                  type="button"
                >
                  <VisibilityOutlined />
                  <span>답변 {inquiry.replies.length}개 보기</span>
                </button>
                <button
                  className={styles.showRepliesButton}
                  onClick={() => setIsReplyFormOpen(true)}
                  type="button"
                >
                  <VisibilityOutlined />
                  <span>답변 달기</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* 답변이 없는 경우 */}
        {(!inquiry.replies || inquiry.replies.length === 0) && !isReplyFormOpen && (
          <div className={styles.repliesSection}>
            <button
              className={styles.showRepliesButton}
              onClick={() => setIsReplyFormOpen(true)}
              type="button"
            >
              <VisibilityOutlined />
              <span>답변 달기</span>
            </button>
          </div>
        )}

        {/* 답변 작성 폼 */}
        {isReplyFormOpen && (
          <div className={styles.replyFormSection}>
            <div className={styles.replyFormHeader}>
              <div className={styles.replyFormTitleContainer}>
                <ChatBubbleOutlineOutlined className={styles.replyFormIcon} />
                <h4 className={styles.replyFormTitle}>답변 작성 중...</h4>
              </div>
            </div>
            <div className={styles.replyFormTextareaSection}>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="답변을 입력해 주세요..."
                maxLength={300}
                className={styles.replyTextarea}
              />
              <div className={styles.replyFormFooter}>
                <span className={styles.replyCharCount}>{replyText.length}/300</span>
                <div className={styles.replyFormButtons}>
                  <button className={styles.cancelButton} onClick={handleCancelReply} type="button">
                    취소
                  </button>
                  <Button
                    variant="primary"
                    size="small"
                    theme="light"
                    leftIcon={<SendOutlined />}
                    onClick={handleReplySubmit}
                    disabled={!replyText.trim()}
                    className={styles.replySubmitButton}
                  >
                    답변 등록
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
