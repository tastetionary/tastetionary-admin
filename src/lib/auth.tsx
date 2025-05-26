import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 사용자 정보 확인
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // 실제 API 호출 대신 모의 로그인 로직
    await new Promise(resolve => setTimeout(resolve, 1000)) // 로딩 시뮬레이션
    
    // 테스트용 계정들
    const testAccounts = [
      { email: 'admin@tastetionary.com', password: 'admin123', role: 'admin' as const },
      { email: 'user@tastetionary.com', password: 'user123', role: 'user' as const },
    ]
    
    const account = testAccounts.find(acc => acc.email === email && acc.password === password)
    
    if (account) {
      const userData: User = {
        id: account.role === 'admin' ? 'admin-001' : 'user-001',
        name: account.role === 'admin' ? '관리자' : '사용자',
        email: account.email,
        role: account.role,
      }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 