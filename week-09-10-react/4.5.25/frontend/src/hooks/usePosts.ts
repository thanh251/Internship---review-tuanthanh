import { useEffect } from 'react'
import { posts, isLoading, error } from '../stores/blogStore'
import { token } from '../stores/authStore'

function usePosts() {
  useEffect(() => {
    isLoading.value = true
    error.value = ''

    fetch('/api/posts?page=1&limit=20', {  
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải bài viết')
        return res.json()
      })
      .then(data => {
        posts.value = data.data   
        isLoading.value = false
      })
      .catch(err => {
        error.value = err.message
        isLoading.value = false
      })
  }, [])
}

export default usePosts