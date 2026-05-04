import { signal, computed } from '@preact/signals-react'

type User = {
  id: number
  username: string
}

// State toàn app
export const currentUser = signal<User | null>(null)

// Computed — tự tính dựa trên currentUser
// currentUser thay đổi → isAuthenticated tự cập nhật
export const isAuthenticated = computed(() => currentUser.value !== null)
