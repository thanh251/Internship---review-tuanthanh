import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { currentUser, isAuthenticated, token } from '../stores/authStore'
import { toast } from 'sonner'
import { API_URL } from '@/lib/api'

type Comment = {
  id: string
  content: string
  author: {
    id: string
    name: string
  }
  createdAt: string
}

type PostDetail = {
  id: string
  title: string
  content: string
  published: boolean
  author: {
    id: string
    name: string
  }
  comments: Comment[]
  createdAt: string
}

type PostDetailProps = {
  postId: string
  onNavigate: (page: string, postId?: string) => void
}

function PostDetail({ postId, onNavigate }: PostDetailProps) {

  const [post, setPost] = useState<PostDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError('')

    fetch(`${API_URL}/api/posts/${postId}`)
      .then(res => {
        if (!res.ok) throw new Error('Không tìm thấy bài viết')
        return res.json()
      })
      .then(data => {
        setPost(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [postId])

  async function handleAddComment() {
    if (!newComment.trim()) return
    setSubmitting(true)

    try {
      const res = await fetch(`${API_URL}//api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({ content: newComment })
      })

      if (!res.ok) throw new Error('Thêm comment thất bại')

      const comment = await res.json()


      setPost(prev => prev ? {
        ...prev,
        comments: [...prev.comments, comment]
      } : null)

      setNewComment('')
      toast.success('Đã thêm comment') 

    } catch (err: any) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }


  async function handleDeleteComment(commentId: string) {
    if (!confirm('Xoá comment này?')) return

    try {
      const res = await fetch(`${API_URL}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })

      if (!res.ok) throw new Error('Xoá comment thất bại')

      setPost(prev => prev ? {
        ...prev,
        comments: prev.comments.filter(c => c.id !== commentId)
      } : null)
      toast.success('Đã xoá comment')  

    } catch (err: any) {
      alert(err.message)
    }
  }

  if (loading) return (
    <p className="text-center text-gray-500 py-8">Đang tải...</p>
  )

  if (error) return (
    <p className="text-center text-red-500 py-8">{error}</p>
  )


  if (!post) return null

  const isAuthor = currentUser.value?.id === post.author.id
  const date = new Date(post.createdAt).toLocaleDateString('vi-VN')

  return (
    <div>


      <button
        className="text-sm text-blue-500 hover:underline mb-6 block"
        onClick={() => onNavigate('home')}
      >
        ← Quay lại
      </button>

      <div className="bg-white border rounded-xl p-8 mb-6">
        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            {post.author.name} · {date}
          </p>


          {isAuthor && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('edit', post.id)}
            >
              Sửa bài
            </Button>
          )}
        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Comments ({post.comments.length})
        </h2>

        {post.comments.length === 0 && (
          <p className="text-gray-500 text-sm mb-4">
            Chưa có comment nào
          </p>
        )}

        {post.comments.map(comment => (
          <div key={comment.id} className="border-b py-4 last:border-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-sm">{comment.author.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                </p>
              </div>

              {currentUser.value?.id === comment.author.id && (
                <button
                  className="text-xs text-red-400 hover:text-red-600"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Xoá
                </button>
              )}
            </div>
            <p className="text-gray-700 mt-2">{comment.content}</p>
          </div>
        ))}

        {isAuthenticated.value ? (
          <div className="mt-4 flex flex-col gap-2">
            <textarea
              className="border rounded-lg px-4 py-2 w-full resize-none text-sm"
              placeholder="Viết comment..."
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              size="sm"
              disabled={submitting || !newComment.trim()}
              onClick={handleAddComment}
            >
              {submitting ? 'Đang gửi...' : 'Gửi comment'}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-4">
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => onNavigate('login')}
            >
              Đăng nhập
            </span>
            {' '}để thêm comment
          </p>
        )}
      </div>

    </div>
  )
}

export default PostDetail