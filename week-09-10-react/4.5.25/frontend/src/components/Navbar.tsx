import { Button } from '@/components/ui/button'

// Import global state từ authStore để đọc trạng thái đăng nhập
import { currentUser, isAuthenticated, token } from '../stores/authStore'

// onNavigate — props callback, dùng để chuyển "trang"
// Vì chưa có Router, bạn dùng state để điều hướng
// Component cha truyền hàm này vào, Navbar gọi khi bấm nút
type NavbarProps = {
  onNavigate: (page: string) => void
}

function Navbar({ onNavigate }: NavbarProps) {

  // Hàm đăng xuất, xoá token và user
  function handleLogout() {
    token.value = null
    currentUser.value = null
  }

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">

      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        DevBlog
      </h1>

      <div className="flex items-center gap-3">

        {isAuthenticated.value ? (
          <>
            <span className="text-sm text-gray-600">
              Xin chào, {currentUser.value?.name}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('login')}
            >
              Đăng nhập
            </Button>
            <Button
              size="sm"
              onClick={() => onNavigate('register')}
            >
              Đăng ký
            </Button>
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar