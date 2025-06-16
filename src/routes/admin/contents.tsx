import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/admin/contents')({
  component: ContentsPage,
})

function ContentsPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">컨텐츠 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            플랫폼의 모든 컨텐츠를 관리하고 편집할 수 있는 페이지입니다.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
