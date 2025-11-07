'use client'
import { useAuthGuard } from 'commons/hooks/useAuthGuard'
import AdminBadgeDetail from 'components/admin-badges/admin-badge-detail'

// [관리자 페이지] 배지 디테일 정보 보기
export default function AdminBadgeDetailPage() {
  useAuthGuard()
  return <AdminBadgeDetail />
}
