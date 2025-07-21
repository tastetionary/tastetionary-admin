import { useState } from 'react'
import { AdminLayout } from '../AdminLayout'
import { MemberSearchCard, type MemberSearchFormData } from './MemberSearchCard'
import { MemberTable } from './MemberTable'

export function Members() {
  const [searchParams, setSearchParams] = useState<MemberSearchFormData | undefined>()

  const handleSearch = (data: MemberSearchFormData) => {
    setSearchParams(data)
  }

  return (
    <AdminLayout title="회원 관리" description="회원을 검색하고 필터링할 수 있습니다.">
      <MemberSearchCard onSearch={handleSearch} />
      <MemberTable searchParams={searchParams} />
    </AdminLayout>
  )
}
