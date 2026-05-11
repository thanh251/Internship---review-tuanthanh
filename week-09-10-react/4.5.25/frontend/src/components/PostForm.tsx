import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { token } from '@/stores/authStore'
import { posts } from '@/stores/blogStore'

type PostFormData = {
  title: string
  content: string
}

type PostFormProps = {
  onSuccess: (postId: string) => void
}

function PostForm({ onSuccess }: PostFormProps) {
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PostFormData>()

  async function onSubmit(data: PostFormData) {
    try {
      setServerError('')

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Tạo bài thất bại')
      }

      const newPost = await res.json()
      posts.value = [newPost, ...posts.value]
      onSuccess(newPost.id)

    } catch (err: any) {
      setServerError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Tiêu đề</Label>
        <Input
          id="title"
          placeholder="Nhập tiêu đề bài viết..."
          {...register('title', {
            required: 'Vui lòng nhập tiêu đề',
            minLength: { value: 5, message: 'Tối thiểu 5 ký tự' }
          })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Nội dung</Label>
        {/* textarea thay vì Input — nội dung bài viết dài */}
        <textarea
          id="content"
          className="border rounded-lg px-4 py-2 w-full resize-none text-sm min-h-48"
          placeholder="Viết nội dung bài viết..."
          {...register('content', {
            required: 'Vui lòng nhập nội dung',
            minLength: { value: 10, message: 'Tối thiểu 10 ký tự' }
          })}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-500 text-center">{serverError}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang đăng...' : 'Đăng bài'}
        </Button>
      </div>

    </form>
  )
}

export default PostForm