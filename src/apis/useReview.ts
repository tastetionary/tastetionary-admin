export type Review = {
  totalCount: number
  totalPages: number
  limit: number
  data: {
    reviews: {
      category: string
      createdAt: string
      deletedAt: null | string
      external_restaurant_information_id: string
      id: string
      keywords: string[]
      opinion: 'Y' | 'N'
      prices: string[]
      reviewReactionCnt: { L: number; D: number }
      summary: string
      user: {
        id: number
        nickname: string
        reivews: number
      }
      userId: number
      userReaction: null
    }[]
    keywordReviews: {
      revisitRatio: number
      total: number
      keywordCounts: { name: string; count: number }[]
    }
  }
}

export type ReviewSearchParams = {
  searchType?: string
  searchValue?: string
  page?: number
  limit?: number
}
