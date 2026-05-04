import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type LoginFormData = {
  username: string
  password: string
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>()

  async function onSubmit(data: LoginFormData) {
    console.log(data)  // { username: '...', password: '...' }
    // sau này gọi API login ở đây
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Tên đăng nhập</Label>
        <Input
          id="username"
          placeholder="Nhập tên đăng nhập..."
          {...register('username', {
            required: 'Vui lòng nhập tên đăng nhập',
            minLength: { value: 3, message: 'Tối thiểu 3 ký tự' }
          })}
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>

    </form>
  )
}

export default LoginForm