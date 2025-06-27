import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/admin/reviews')({
  component: ReviewsPage,
})

function ReviewsPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">리뷰 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            사용자가 작성한 리뷰를 관리하고 검토할 수 있는 페이지입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
