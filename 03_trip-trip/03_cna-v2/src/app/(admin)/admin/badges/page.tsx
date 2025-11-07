'use client'
import { useAuthGuard } from 'commons/hooks/useAuthGuard'
import AdminBadgeList from 'components/admin-badges/admin-badge-list'

// [관리자 페이지] 배지 정보 페이지
export default function AdminBadgesPage() {
  useAuthGuard()
  return <AdminBadgeList />
}
