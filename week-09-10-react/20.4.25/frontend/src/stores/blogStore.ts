import { signal } from '@preact/signals-react'

type Post = {
  id: number
  title: string
  author: string
  description: string
}

export const posts = signal<Post[]>([])
export const isLoading = signal(false)
export const error = signal('')