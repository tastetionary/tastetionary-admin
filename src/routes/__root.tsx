import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import logoSvg from '@/assets/logo.svg'

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
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <img src={logoSvg} alt="맛셔너리 로고" className="h-[20px] w-[30px]" />
                <p className="font-galmuri m-0 leading-none">맛셔너리</p>
              </div>
              {user && (
                <nav className="flex justify-center gap-4">
                  <Link
                    to="/"
                    className="text-gray-600 transition-colors hover:text-gray-900 [&.active]:font-medium [&.active]:text-blue-600"
                  >
                    대시보드
                  </Link>
                  {user.role === 'admin' && (
                    <>
                      <Link
                        to="/admin/reviews"
                        className="text-gray-600 transition-colors hover:text-gray-900 [&.active]:font-medium [&.active]:text-blue-600"
                      >
                        리뷰 관리
                      </Link>
                      <Link
                        to="/admin/members"
                        className="text-gray-600 transition-colors hover:text-gray-900 [&.active]:font-medium [&.active]:text-blue-600"
                      >
                        회원 관리
                      </Link>
                      <Link
                        to="/admin/contents"
                        className="text-gray-600 transition-colors hover:text-gray-900 [&.active]:font-medium [&.active]:text-blue-600"
                      >
                        컨텐츠 관리
                      </Link>
                      <Link
                        to="/admin/reports"
                        className="text-gray-600 transition-colors hover:text-gray-900 [&.active]:font-medium [&.active]:text-blue-600"
                      >
                        신고 관리
                      </Link>
                    </>
                  )}
                </nav>
              )}
              {user && (
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
