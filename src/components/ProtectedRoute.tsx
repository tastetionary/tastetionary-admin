import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        navigate({ to: '/login' })
        return
      }

      if (requireAdmin && user.role !== 'admin') {
        // 관리자 권한이 필요한데 일반 사용자인 경우 홈으로 리다이렉트
        navigate({ to: '/' })
        return
      }
    }
  }, [user, isLoading, navigate, requireAdmin])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  if (requireAdmin && user.role !== 'admin') {
    return null // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  return <>{children}</>
}
