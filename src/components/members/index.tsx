import { AdminLayout } from '../AdminLayout'
import { MemberSearchCard } from './MemberSearchCard'

export function Members() {
  return (
    <AdminLayout title="회원 관리" description="회원을 검색하고 필터링할 수 있습니다.">
      <MemberSearchCard />
    </AdminLayout>
  )
}
