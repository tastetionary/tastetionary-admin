import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/lib/auth'
import { 
  User, 
  Star, 
  ShoppingBag, 
  Heart, 
  Clock, 
  Gift, 
  TrendingUp,
  Bell,
  Settings
} from 'lucide-react'

function UserDashboard() {
  const { user } = useAuth()
  
  const userData = {
    name: user?.name || "사용자",
    email: user?.email || "",
    avatar: "👤",
    level: "골드",
    points: 1250,
    nextLevelPoints: 2000
  }

  const recentOrders = [
    { id: "ORD001", date: "2024-01-15", status: "배송완료", total: "₩89,000" },
    { id: "ORD002", date: "2024-01-10", status: "배송중", total: "₩125,000" },
    { id: "ORD003", date: "2024-01-05", status: "주문확인", total: "₩67,000" },
  ]

  const favoriteItems = [
    { name: "프리미엄 커피 원두", price: "₩25,000", rating: 4.8 },
    { name: "수제 초콜릿 세트", price: "₩45,000", rating: 4.9 },
    { name: "유기농 차 컬렉션", price: "₩35,000", rating: 4.7 },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                안녕하세요, {userData.name}님! 👋
              </h1>
              <p className="text-gray-600 mt-2">오늘도 맛있는 하루 되세요</p>
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

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">회원 등급</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.level}</div>
                <p className="text-xs text-muted-foreground">
                  다음 등급까지 {userData.nextLevelPoints - userData.points}P
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">보유 포인트</CardTitle>
                <Gift className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.points.toLocaleString()}P</div>
                <p className="text-xs text-muted-foreground">
                  이번 달 +150P 적립
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">이번 달 주문</CardTitle>
                <ShoppingBag className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  총 ₩281,000
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">찜한 상품</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3개 세일 중
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  최근 주문 내역
                </CardTitle>
                <CardDescription>
                  최근 주문하신 상품들을 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <Badge variant={
                          order.status === "배송완료" ? "default" :
                          order.status === "배송중" ? "secondary" :
                          "outline"
                        }>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  전체 주문 내역 보기
                </Button>
              </CardContent>
            </Card>

            {/* Profile & Actions */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    프로필
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                      {userData.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{userData.name}</p>
                      <p className="text-sm text-gray-600">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>등급 진행도</span>
                      <span>{Math.round((userData.points / userData.nextLevelPoints) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all" 
                        style={{ width: `${(userData.points / userData.nextLevelPoints) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button className="w-full">프로필 수정</Button>
                </CardContent>
              </Card>

              {/* Favorite Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    찜한 상품
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {favoriteItems.map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{item.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-blue-600">{item.price}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    찜 목록 전체보기
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  빠른 메뉴
                </CardTitle>
                <CardDescription>
                  자주 사용하는 기능들을 빠르게 이용하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <ShoppingBag className="h-6 w-6" />
                    <span>상품 주문</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Heart className="h-6 w-6" />
                    <span>찜 목록</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Gift className="h-6 w-6" />
                    <span>쿠폰/혜택</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <User className="h-6 w-6" />
                    <span>고객센터</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export const Route = createFileRoute('/')({
  component: UserDashboard,
}) 