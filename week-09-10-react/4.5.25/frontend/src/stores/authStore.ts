import { signal, computed } from '@preact/signals-react'

type User = {
    id: string
    email: string
    name: string
}

export const currentUser = signal<User | null>(null)
export const token = signal<string | null>(null)

export const isAuthenticated = computed(() => token.value !== null)
//Nơi lưu data đăng nhập