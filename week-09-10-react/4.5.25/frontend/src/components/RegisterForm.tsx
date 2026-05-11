import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAuth from '../hooks/useAuth'

type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type RegisterFormProps = {
  onSuccess: () => void
  onNavigate: (page: string) => void
}

function RegisterForm({ onSuccess, onNavigate }: RegisterFormProps) {
  const { register: registerUser } = useAuth()

  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>()

  const passwordValue = watch('password')

  async function onSubmit(data: RegisterFormData) {
    try {
      setServerError('')

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password
      })

      setSuccessMessage('Đăng ký thành công! Chuyển sang đăng nhập...')
      setTimeout(() => {
        onSuccess()
        onNavigate('login')
      }, 1500)

    } catch (err: any) {
      setServerError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center justify-between">

      <div className="flex flex-col gap-2 ">
        <Label htmlFor="name">Họ tên</Label>
        <Input
          id="name"
          placeholder="Nhập họ tên..."
          {...register('name', {
            required: 'Vui lòng nhập họ tên',
            minLength: { value: 2, message: 'Tối thiểu 2 ký tự' }
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

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

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu..."
          {...register('confirmPassword', {
            required: 'Vui lòng xác nhận mật khẩu',

            validate: value =>
              value === passwordValue || 'Mật khẩu không khớp'
          })}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-500 text-center">{serverError}</p>
      )}

      {successMessage && (
        <p className="text-sm text-green-500 text-center">{successMessage}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
      </Button>

      <p className="text-sm text-center text-gray-500">
        Đã có tài khoản?{' '}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => onNavigate('login')}
        >
          Đăng nhập
        </span>
      </p>

    </form>
  )
}

export default RegisterForm