import { useEffect } from 'react'
import { posts, isLoading, error } from '../stores/blogStore'

function usePosts() {
  useEffect(() => {
    isLoading.value = true

    fetch('/api/posts')
      .then(res => {
        if (!res.ok) throw new Error('Lỗi server')
        return res.json()
      })
      .then(data => {
        posts.value = data
        isLoading.value = false
      })
      .catch(err => {
        error.value = err.message
        isLoading.value = false
      })
  }, [])
}

export default usePosts