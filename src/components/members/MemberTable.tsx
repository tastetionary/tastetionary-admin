import { useUsers } from '@/apis/useUsers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import type { MemberSearchFormData } from './MemberSearchCard'
import { Button } from '../ui/button'
import { EllipsisIcon } from 'lucide-react'
import dayjs from 'dayjs'

export const MemberTable = ({
  searchParams,
}: {
  searchParams: MemberSearchFormData | undefined
}) => {
  const { data } = useUsers(searchParams)

  return (
    <Card>
      <CardHeader>
        <CardTitle>회원 목록</CardTitle>
        <CardDescription>총 {data?.total}개의 회원이 등록되어 있습니다.</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>아이디</TableHead>
              <TableHead>닉네임</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead>최근 로그인</TableHead>
              <TableHead className="text-center">더보기</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users?.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.account?.identification}</TableCell>
                <TableCell className="whitespace-nowrap">{user.nickname}</TableCell>
                <TableCell>{dayjs(user.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell>{dayjs(user.updatedAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell className="text-center">
                  <Button variant={'ghost'}>
                    <EllipsisIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
