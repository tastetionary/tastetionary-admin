import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SearchInput } from '../ui/search-input'
import { Button } from '../ui/button'
import { REVIEW_TABLE_SELECT_OPTIONS } from './constant'

const searchFormSchema = z.object({
  searchType: z.string(),
  searchValue: z.string().min(1, '검색어를 입력해주세요'),
})

export interface ReviewSearchFormData {
  searchType: string
  searchValue: string
}

interface ReviewSearchCardProps {
  onSearch: (data: ReviewSearchFormData) => void
}

export const ReviewSearchCard = ({ onSearch }: ReviewSearchCardProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<ReviewSearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchType: 'all',
      searchValue: '',
    },
  })

  const onSubmit = (data: ReviewSearchFormData) => {
    onSearch(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>리뷰 검색 및 필터</CardTitle>
        <CardDescription>리뷰를 검색하고 필터링할 수 있습니다.</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="searchType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="검색 유형 선택" />
                </SelectTrigger>

                <SelectContent>
                  {REVIEW_TABLE_SELECT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            name="searchValue"
            control={control}
            render={({ field }) => (
              <SearchInput placeholder="작성자, 식당명, 등록일로 검색..." {...field} />
            )}
          />

          <Button type="submit" disabled={isSubmitting || !isValid}>
            검색
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
