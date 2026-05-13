import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { currentUser, isAuthenticated, token } from '../stores/authStore'
import { toast } from 'sonner'

type NavbarProps = {
  onNavigate: (page: string) => void
}

function Navbar({ onNavigate }: NavbarProps) {
  function handleLogout() {
    token.value = null
    currentUser.value = null
    toast.success('Đã đăng xuất')
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {currentUser.value?.name} ▾
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-xs text-gray-400 font-normal">
                {currentUser.value?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('create')}>
                Viết bài mới
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500 focus:bg-red-50"
                onClick={handleLogout}
              >
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={() => onNavigate('login')}>
              Đăng nhập
            </Button>
            <Button size="sm" onClick={() => onNavigate('register')}>
              Đăng ký
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar