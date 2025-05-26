import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <>
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h2 className="text-xl font-bold text-gray-900">Tastetionary</h2>
              {user && (
                <nav className="flex gap-4">
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-gray-900 transition-colors [&.active]:text-blue-600 [&.active]:font-medium"
                  >
                    대시보드
                  </Link>
                  {user.role === 'admin' && (
                    <>
                      <Link 
                        to="/admin" 
                        className="text-gray-600 hover:text-gray-900 transition-colors [&.active]:text-blue-600 [&.active]:font-medium"
                      >
                        관리자
                      </Link>
                      <Link 
                        to="/admin/members" 
                        className="text-gray-600 hover:text-gray-900 transition-colors [&.active]:text-blue-600 [&.active]:font-medium"
                      >
                        회원 관리
                      </Link>
                    </>
                  )}
                </nav>
              )}
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {user.role === 'admin' ? '관리자' : '사용자'}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  로그아웃
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
} 