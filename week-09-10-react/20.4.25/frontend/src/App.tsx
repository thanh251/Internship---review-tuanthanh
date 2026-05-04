import { useState } from 'react'
import { Input } from '@/components/ui/input'
import Navbar from './components/Navbar'
import PostCard from './components/PostCard'
import LoginForm from './components/LoginForm'

const posts = [
  { id: 1, title: 'Học React từ đầu', author: 'Nguyen Van A', description: 'Hướng dẫn React cho người mới...' },
  { id: 2, title: 'Tailwind CSS cơ bản', author: 'Tran Thi B', description: 'Các class Tailwind hay dùng nhất...' },
  { id: 3, title: 'Node.js và Express', author: 'Le Van C', description: 'Xây dựng REST API từ A đến Z...' },
]

function App() {
  const [keyword, setKeyword] = useState('')

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <div>
      <Navbar />

      {/* Form đăng nhập */}
      <div className="max-w-md mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
        <LoginForm />
      </div>

      {/* Danh sách bài viết */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Input
          className="mb-6"
          placeholder="Tìm kiếm bài viết..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500">Không tìm thấy bài viết</p>
        )}

        {filteredPosts.map(post => (
          <PostCard
            key={post.id}
            title={post.title}
            author={post.author}
            description={post.description}
          />
        ))}
      </div>
    </div>
  )
}

export default App