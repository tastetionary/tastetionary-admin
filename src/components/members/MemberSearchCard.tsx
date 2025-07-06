import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SearchInput } from '../ui/search-input'
import { Button } from '../ui/button'

const SELECT_OPTIONS: { label: string; value: string }[] = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '회원 이름',
    value: 'name',
  },
  {
    label: '아이디',
    value: 'id',
  },
  {
    label: '닉네임',
    value: 'nickname',
  },
  {
    label: '가입일',
    value: 'joinDate',
  },
  {
    label: '활동상태',
    value: 'activityStatus',
  },
]

const searchFormSchema = z.object({
  searchType: z.string(),
  searchValue: z.string().min(1, '검색어를 입력해주세요'),
})

interface SearchFormData {
  searchType: string
  searchValue: string
}

export const MemberSearchCard = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchType: 'all',
      searchValue: '',
    },
  })

  const onSubmit = (data: SearchFormData) => {
    console.log(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>회원 검색 및 필터</CardTitle>
        <CardDescription>회원을 검색하고 필터링할 수 있습니다.</CardDescription>
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
                  {SELECT_OPTIONS.map(option => (
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
              <SearchInput placeholder="이름, 이메일, 가입일, 활동 상태로 검색..." {...field} />
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
