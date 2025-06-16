import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Eye, EyeOff } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  rememberMe: z.boolean(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form

  const rememberMe = watch('rememberMe')

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('')

    try {
      const success = await login(data.email, data.password)
      if (success) {
        navigate({ to: '/' })
      } else {
        setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.')
      }
    } catch (error) {
      console.log(error)
      setLoginError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Tastetionary</CardTitle>
          <CardDescription>계정에 로그인하여 서비스를 이용하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {loginError && (
              <Alert variant="destructive">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력하세요"
                  {...register('password')}
                  className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={checked => setValue('rememberMe', !!checked)}
              />
              <Label htmlFor="rememberMe" className="text-sm">
                로그인 상태 유지
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600">
              <p className="mb-2 text-left">테스트 계정:</p>
              <div className="space-y-1 rounded bg-gray-50 px-6 py-3 text-left text-xs">
                <p>
                  <strong>관리자:</strong> admin@tastetionary.com / admin123
                </p>
                <p>
                  <strong>사용자:</strong> user@tastetionary.com / user123
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
