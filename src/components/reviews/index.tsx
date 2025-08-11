import { useState } from 'react'
import { AdminLayout } from '../AdminLayout'
import { ReviewSearchCard, type ReviewSearchFormData } from './ReviewSearchCard'
import { ReviewTable } from './ReviewTable'

export function Reviews() {
  const [searchParams, setSearchParams] = useState<ReviewSearchFormData | undefined>()

  const handleSearch = (data: ReviewSearchFormData) => {
    setSearchParams(data)
  }

  return (
    <AdminLayout title="리뷰 관리" description="리뷰가 등록된 식당과 작성된 리뷰를 확인하세요.">
      <ReviewSearchCard onSearch={handleSearch} />
      <ReviewTable searchParams={searchParams} />
    </AdminLayout>
  )
}
