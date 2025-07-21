import type { MemberSearchFormData } from '@/components/members/MemberSearchCard'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type User = {
  data: {
    total: number
    users: {
      account: null | {
        category: 'email' | 'kakao' | 'naver' | 'google'
        identification: string
      }
      area: null | {
        id: number
        address: string
        latitude: number
        longitude: number
        order: number
        userId: number
      }
      createdAt: string
      updatedAt: string
      id: number
      nickname: string
      role: 'USER' | 'ADMIN'
    }[]
  }
}

export const useUsers = (searchParams?: MemberSearchFormData) => {
  const token = localStorage.getItem('token')

  return useQuery({
    queryKey: ['users', searchParams],
    queryFn: async () => {
      const response = await axios.get<User>('/apis/v1/admin/users', {
        params: {
          ...(searchParams && {
            [searchParams.searchType]: searchParams.searchValue,
          }),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    },
    enabled: Boolean(token) && (!searchParams || Boolean(searchParams.searchValue?.trim())),
  })
}
