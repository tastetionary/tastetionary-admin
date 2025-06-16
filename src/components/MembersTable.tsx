import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Download,
  Filter,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
} from 'lucide-react'

interface Member {
  id: string
  name: string
  email: string
  phone: string
  level: string
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  lastLogin: string
  orders: number
  totalSpent: number
  avatar?: string
}

const mockMembers: Member[] = [
  {
    id: 'M001',
    name: '김민수',
    email: 'minsu.kim@example.com',
    phone: '010-1234-5678',
    level: '골드',
    status: 'active',
    joinDate: '2023-03-15',
    lastLogin: '2024-01-15',
    orders: 12,
    totalSpent: 450000,
  },
  {
    id: 'M002',
    name: '이영희',
    email: 'younghee.lee@example.com',
    phone: '010-2345-6789',
    level: '실버',
    status: 'active',
    joinDate: '2023-06-20',
    lastLogin: '2024-01-14',
    orders: 8,
    totalSpent: 280000,
  },
  {
    id: 'M003',
    name: '박철수',
    email: 'chulsoo.park@example.com',
    phone: '010-3456-7890',
    level: '플래티넘',
    status: 'active',
    joinDate: '2023-01-10',
    lastLogin: '2024-01-13',
    orders: 25,
    totalSpent: 890000,
  },
  {
    id: 'M004',
    name: '정수진',
    email: 'sujin.jung@example.com',
    phone: '010-4567-8901',
    level: '브론즈',
    status: 'inactive',
    joinDate: '2023-09-05',
    lastLogin: '2023-12-20',
    orders: 3,
    totalSpent: 120000,
  },
  {
    id: 'M005',
    name: '한지민',
    email: 'jimin.han@example.com',
    phone: '010-5678-9012',
    level: '골드',
    status: 'suspended',
    joinDate: '2023-07-12',
    lastLogin: '2024-01-10',
    orders: 15,
    totalSpent: 520000,
  },
  {
    id: 'M006',
    name: '송태희',
    email: 'taehee.song@example.com',
    phone: '010-6789-0123',
    level: '실버',
    status: 'active',
    joinDate: '2023-11-08',
    lastLogin: '2024-01-15',
    orders: 6,
    totalSpent: 190000,
  },
]

export function MembersTable() {
  const getStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">활성</Badge>
      case 'inactive':
        return <Badge variant="secondary">비활성</Badge>
      case 'suspended':
        return <Badge variant="destructive">정지</Badge>
      default:
        return <Badge variant="outline">알 수 없음</Badge>
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case '플래티넘':
        return 'text-purple-600 bg-purple-100'
      case '골드':
        return 'text-yellow-600 bg-yellow-100'
      case '실버':
        return 'text-gray-600 bg-gray-100'
      case '브론즈':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">회원 관리</h1>
          <p className="mt-2 text-gray-600">회원 정보를 조회하고 관리하세요</p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>회원 검색 및 필터</CardTitle>
            <CardDescription>회원을 검색하고 필터링할 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="이름, 이메일, 전화번호로 검색..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="등급" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="platinum">플래티넘</SelectItem>
                    <SelectItem value="gold">골드</SelectItem>
                    <SelectItem value="silver">실버</SelectItem>
                    <SelectItem value="bronze">브론즈</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="active">활성</SelectItem>
                    <SelectItem value="inactive">비활성</SelectItem>
                    <SelectItem value="suspended">정지</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  필터
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  내보내기
                </Button>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  회원 추가
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>회원 목록</CardTitle>
                <CardDescription>
                  총 {mockMembers.length}명의 회원이 등록되어 있습니다
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>회원</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>등급</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>가입일</TableHead>
                  <TableHead>최근 로그인</TableHead>
                  <TableHead>주문수</TableHead>
                  <TableHead>총 구매액</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${getLevelColor(member.level)}`}
                      >
                        {member.level}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell className="text-sm">{member.joinDate}</TableCell>
                    <TableCell className="text-sm">{member.lastLogin}</TableCell>
                    <TableCell className="text-center">{member.orders}회</TableCell>
                    <TableCell className="font-medium">
                      ₩{member.totalSpent.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>작업</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            상세보기
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            수정
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            이메일 발송
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            1-{mockMembers.length} of {mockMembers.length} 회원
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              이전
            </Button>
            <Button variant="outline" size="sm" disabled>
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
