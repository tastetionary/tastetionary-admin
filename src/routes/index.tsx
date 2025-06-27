import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/lib/auth'
import { Bell, Settings } from 'lucide-react'

function UserDashboard() {
  const { user } = useAuth()

  const userData = {
    name: user?.name || '사용자',
    email: user?.email || '',
    avatar: '👤',
    level: '골드',
    points: 1250,
    nextLevelPoints: 2000,
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl p-6">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                안녕하세요, {userData.name}님! 👋
              </h1>
              <p className="mt-2 text-gray-600">오늘도 맛있는 하루 되세요</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export const Route = createFileRoute('/')({
  component: UserDashboard,
})
