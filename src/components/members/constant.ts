export const MEMBER_TABLE_SELECT_OPTIONS: { label: string; value: string }[] = [
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
] as const
