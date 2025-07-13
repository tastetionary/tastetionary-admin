import type { MemberSearchFormData } from '@/components/members/MemberSearchCard'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useUsers = (searchParams?: MemberSearchFormData) => {
  const token = localStorage.getItem('token')

  return useQuery({
    queryKey: ['users', searchParams],
    queryFn: async () => {
      const response = await axios.get('/apis/v1/admin/users', {
        params: {
          ...(searchParams && {
            searchType: searchParams.searchType,
            searchValue: searchParams.searchValue,
          }),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    enabled: Boolean(token) && (!searchParams || Boolean(searchParams.searchValue?.trim())),
  })
}
