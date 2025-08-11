export const REVIEW_TABLE_SELECT_OPTIONS: { label: string; value: string }[] = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '작성자',
    value: 'author',
  },
  {
    label: '식당명',
    value: 'restaurantName',
  },
  {
    label: '등록일',
    value: 'createdAt',
  },
] as const
