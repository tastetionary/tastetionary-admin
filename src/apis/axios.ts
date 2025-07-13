import axios from 'axios'

// 토큰이 필요 없는 엔드포인트 목록
const PUBLIC_ENDPOINTS = ['/api/auth/login']

// 요청 인터셉터 - 토큰 자동 추가 (공개 엔드포인트 제외)
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint => config.url?.includes(endpoint))

    // 공개 엔드포인트가 아니고 토큰이 있으면 추가
    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 - 에러 처리
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 401 에러 시 토큰 제거 및 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
