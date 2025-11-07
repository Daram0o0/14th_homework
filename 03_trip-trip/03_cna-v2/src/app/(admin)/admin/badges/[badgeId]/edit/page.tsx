'use client'
import { useAuthGuard } from 'commons/hooks/useAuthGuard'
import AdminBadgeForm from 'components/admin-badges/admin-badge-form'

// [관리자 페이지] 배지 정보 수정하기 페이지
export default function AdminBadgeEditPage() {
  useAuthGuard()
  return (
    <>
      <AdminBadgeForm />
    </>
  )
}
