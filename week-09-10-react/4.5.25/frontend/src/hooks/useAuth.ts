// Import global state từ authStore
import { currentUser, token } from '../stores/authStore'
import { API_URL } from '@/lib/api'
type LoginData = {
  email: string
  password: string
}

type RegisterData = {
  name: string
  email: string
  password: string
}

function useAuth() {

  // Hàm đăng nhập — gọi POST /api/auth/login
  async function login(data: LoginData) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Đăng nhập thất bại')
    }

    const result = await res.json()

    token.value = result.token
    currentUser.value = result.user
  }

  // Hàm đăng ký — gọi POST /api/auth/register
  async function register(data: RegisterData) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Đăng ký thất bại')
    }

    return await res.json()
  }

  function logout() {
    token.value = null
    currentUser.value = null
  }

  return { login, register, logout }
}

export default useAuth