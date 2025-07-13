import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SearchInput } from '../ui/search-input'
import { Button } from '../ui/button'
import { MEMBER_TABLE_SELECT_OPTIONS } from './constant'

const searchFormSchema = z.object({
  searchType: z.string(),
  searchValue: z.string().min(1, '검색어를 입력해주세요'),
})

export interface MemberSearchFormData {
  searchType: string
  searchValue: string
}

interface MemberSearchCardProps {
  onSearch: (data: MemberSearchFormData) => void
}

export const MemberSearchCard = ({ onSearch }: MemberSearchCardProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<MemberSearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchType: 'all',
      searchValue: '',
    },
  })

  const onSubmit = (data: MemberSearchFormData) => {
    onSearch(data)
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
                  {MEMBER_TABLE_SELECT_OPTIONS.map(option => (
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
