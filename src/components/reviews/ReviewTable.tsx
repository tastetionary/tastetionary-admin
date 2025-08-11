import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { EllipsisIcon } from 'lucide-react'
import dayjs from 'dayjs'
import type { ReviewSearchFormData } from './ReviewSearchCard'
import { type Review, type ReviewSearchParams } from '@/apis/useReview'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import axios from 'axios'

export const ReviewTable = ({
  searchParams,
}: {
  searchParams: ReviewSearchFormData | undefined
}) => {
  const token = localStorage.getItem('token')
  const { ref, inView } = useInView()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['reviews', searchParams],
      queryFn: async ({ pageParam = 1 }) => {
        const params: ReviewSearchParams = {
          page: pageParam,
          limit: 10,
          ...(searchParams && {
            [searchParams.searchType]: searchParams.searchValue,
          }),
        }

        const { data } = await axios.get<Review>('/apis/v1/admin/restaurant/review', {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return {
          limit: data.limit,
          totalCount: data.totalCount,
          totalPages: data.totalPages,
          ...data.data,
          currentPage: pageParam,
        }
      },
      getNextPageParam: lastPage => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1
        }
        return undefined
      },
      enabled: Boolean(token) && (!searchParams || Boolean(searchParams.searchValue?.trim())),
      initialPageParam: 1,
      retry: false, // 에러 발생 시 재시도하지 않음
      retryOnMount: false, // 컴포넌트 마운트 시 재시도하지 않음
    })

  // inView가 true가 되면 다음 페이지 로드 (에러가 없을 때만)
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isError) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, isError, fetchNextPage])

  // 모든 페이지의 리뷰를 하나의 배열로 합치기
  const allReviews = data?.pages.flatMap(page => page.reviews) || []
  const totalCount = data?.pages[0]?.totalCount || 0

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>리뷰 목록</CardTitle>
          <CardDescription>로딩 중...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>리뷰 목록</CardTitle>
        <CardDescription>
          총 {totalCount}개의 리뷰가 등록되어 있습니다.
          {isError && (
            <span className="ml-2 text-red-500">(일부 데이터 로드 중 오류가 발생했습니다)</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>식당명</TableHead>
              <TableHead>작성자</TableHead>
              <TableHead>평점</TableHead>
              <TableHead>등록일</TableHead>
              <TableHead className="text-center">더보기</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allReviews.map(review => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">
                  {review.external_restaurant_information_id}
                </TableCell>
                <TableCell className="whitespace-nowrap">{review.user.nickname}</TableCell>
                <TableCell className="whitespace-nowrap"></TableCell>
                <TableCell>{dayjs(review.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                <TableCell className="text-center">
                  <Button variant={'ghost'}>
                    <EllipsisIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 무한 스크롤을 위한 observer 요소 (에러가 없을 때만 표시) */}
        {!isError && <div ref={ref} className="h-4 w-full" />}

        {/* 로딩 상태 표시 */}
        {isFetchingNextPage && (
          <div className="py-4 text-center text-gray-500">다음 페이지를 불러오는 중...</div>
        )}

        {/* 에러 발생 시 더 이상 데이터가 없다는 메시지 */}
        {isError && allReviews.length > 0 && (
          <div className="py-4 text-center text-gray-500">더 이상 불러올 데이터가 없습니다.</div>
        )}
      </CardContent>
    </Card>
  )
}
