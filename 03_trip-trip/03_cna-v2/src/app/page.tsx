import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href={'/login'}>로그인 페이지</Link>
      <Link href={'/register'}>회원가입 페이지</Link>
      <Link href={'/boards/new'}>보드 등록하기</Link>
      <Link href={'/boards'}>보드</Link>
      <Link href={'/products'}>상품</Link>
      <Link href={'/openapis'}>openapi 활용 과제</Link>
      <Link href={'/mypage/badges'}>내 배지 조회 페이지</Link>
      {/* 관리자 페이지(추후 서비스 분리 예정) - 배지 관련 페이지 */}
      <Link href={'/admin/badges/new'}>관리자 배지 등록 페이지</Link>
      {/* <Link href={'/admin/badges/[badgeId]/edit/page'}>관리자 배지 수정 페이지</Link> */}
      {/* <Link href={'/admin/badges/[badgeId]/edit/page'}>관리자 배지 상세 페이지</Link> */}
      <Link href={'/admin/badges'}>관리자 배지 리스트 조회 페이지</Link>
    </>
  )
}
