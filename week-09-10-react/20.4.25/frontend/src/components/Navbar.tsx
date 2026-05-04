import { Button } from './ui/button'
import { currentUser, isAuthenticated } from '../stores/authStore'
import useAuth from '../hooks/useAuth'

function Navbar() {
  const { login, logout } = useAuth()

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <h1 className="text-xl font-bold">DevBlog</h1>

      <div className="flex items-center gap-4">
        {isAuthenticated.value && (
          <span className="text-sm text-gray-500">
            Xin chào, {currentUser.value?.username}
          </span>
        )}
        <Button
          variant={isAuthenticated.value ? 'outline' : 'default'}
          onClick={() => isAuthenticated.value ? logout() : login('admin', '123')}
        >
          {isAuthenticated.value ? 'Đăng xuất' : 'Đăng nhập'}
        </Button>
      </div>
    </nav>
  )
}

export default Navbar