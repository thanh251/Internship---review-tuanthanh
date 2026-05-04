import { currentUser } from '../stores/authStore'
import { isLoading } from '../stores/blogStore'

function useAuth() {
  async function login(username: string, password: string) {
    isLoading.value = true
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) throw new Error('Sai tài khoản hoặc mật khẩu')
      const data = await res.json()

      currentUser.value = data.user  // cập nhật global state
    } catch (err: any) {
      console.error(err.message)
    }
  }

  function logout() {
    currentUser.value = null  // xoá global state
  }

  return { login, logout }
}

export default useAuth