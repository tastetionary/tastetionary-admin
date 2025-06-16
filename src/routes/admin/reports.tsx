import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/admin/reports')({
  component: ReportsPage,
})

function ReportsPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">신고 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">사용자 신고 사항을 검토하고 처리할 수 있는 페이지입니다.</p>
        </CardContent>
      </Card>
    </div>
  )
}
