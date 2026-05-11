import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { isAuthenticated } from './stores/authStore'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import PostForm from './components/PostForm'

type Page = 'home' | 'login' | 'register' | 'post' | 'create'
function App (){
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [currentPostId, setCurrentPostId] = useState<string | null >(null)
  function navigate(page: string, postId?: string){
    setCurrentPage(page as Page)
    if (postId) setCurrentPostId(postId)
  }

  function renderPage(){
    switch (currentPage){
      case 'home' :
        return (
          <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className='text-2xl font-bold mb-4'>Bài viêts mới nhấc</h2>
            {isAuthenticated.value && (
              <button
              className='text-sm text-blue-500 hover:underline'
              onClick={() => navigate('create')}
              >
                + Viết bài viết
              </button>
            )}
          </div>
          <PostList onNavigate={navigate} />
          </div>
        )

      case 'login':
        return (
          <div className='max-w-md mx-auto'>
            <h2 className='text-2xl font-bold mb-6'>đăng nhập</h2>

            <LoginForm
            onSuccess={() => navigate('home')}
            onNavigate={navigate}/>
          </div>
        )

       case 'register':
        return (
          <div className='max-w-md mx-auto'>
            <h2 className='text-2xl font-bold mb-6'>Đăng ký</h2>
            <RegisterForm
            onSuccess={() => navigate('login')}
            onNavigate={navigate}
            />
          </div>
        )

        case 'post':
          return (
            <PostDetail
            postId={currentPostId!}
            onNavigate={navigate}
            />
        )

        case 'create':
          return (
            <div className="max-w-2xl mx-auto">
              <button
               className="text-sm text-blue-500 hover:underline mb-4 block"
              onClick={() => navigate('home')}
              >
              Quay lại
            </button>
            <h2 className="text-2xl font-bold mb-6">Viết bài mới</h2>
            <PostForm
            onSuccess={(postId) => navigate('post', postId)}
              />
            </div>
          )

        default:
        return <p className='text-gray-500'>Trang ko tồn tại</p>
  }
}    
        return (
          <div
          className='min-h-screen bg-gray-50'>
            <Navbar onNavigate={navigate} />
            <main className='max-w 3xl mx-auto px-4 py-8'>
              {renderPage()}
            </main>
          </div>
        )
      }
export default App

