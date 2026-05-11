import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuth from '../hooks/useAuth'

type LoginFormData = {
  email: string
  password: string
}

type LoginFormProps = {
  onSuccess: () => void
  onNavigate: (page: string) => void
}

function LoginForm({ onSuccess, onNavigate }: LoginFormProps) {
  const { login } = useAuth()

  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>()
  async function onSubmit(data: LoginFormData) {
    try {
      setServerError('')
      await login(data)
      onSuccess()
    } catch (err: any) {
      setServerError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-between">

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Nhập email..."
          {...register('email', {
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email không hợp lệ'
            }
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Mật khẩu</Label>
        <Input
          id="password"
          type="password"
          placeholder="Nhập mật khẩu..."
          {...register('password', {
            required: 'Vui lòng nhập mật khẩu',
            minLength: { value: 6, message: 'Tối thiểu 6 ký tự' }
          })}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-500 text-center">{serverError}</p>
      )}

      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>

      <p className="text-sm text-center text-gray-500">
        Chưa có tài khoản?{' '}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => onNavigate('register')}
        >
          Đăng ký ngay
        </span>
      </p>

    </form>
  )
}

export default LoginForm