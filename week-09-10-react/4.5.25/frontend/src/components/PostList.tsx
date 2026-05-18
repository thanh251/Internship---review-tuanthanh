import { useState } from 'react'
import { Input } from '@/components/ui/input'
import PostCard from './PostCard'
import usePosts from '../hooks/usePosts'
import { toast } from 'sonner'  
import {posts, isLoading, error} from '../stores/blogStore'
import { API_URL } from '@/lib/api'
type PostListProps = {
    onNavigate: (page: string, postId?: string) => void
}

function PostList({ onNavigate }: PostListProps){
    usePosts()
    const [keyword, setKeyword ] = useState('')
    const filteredPosts = posts.value.filter(post =>
        post.title.toLowerCase().includes(keyword.toLowerCase()) ||
        post.content.toLowerCase().includes(keyword.toLowerCase())
    )

    async function handleDelete(postId: string){
        if (!confirm("Xoá k?")) return

        try{
            const res = await fetch(`${API_URL}/api/post/${postId}`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (!res.ok) throw new Error('Xoá fail')
            posts.value=posts.value.filter(post => post.id !== postId)
            toast.success('Đã xoá bài viết') 
        }
        catch (err: any){
            alert(err.message)
            toast.error(err.message)
        }
    }


    return (
        <div>
            <Input
            className='mb-6'
            placeholder='Tìm kiếm bài viết'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            />

            {isLoading.value && (
                <p className="text-center text-red-500 py-8">{error.value}</p>
            )}

            {!isLoading.value && !error.value && filteredPosts.length === 0 && (
                <p className='text-center text-gray-500 py-8'>
                    {keyword ? 'K tìm thấy bài viết' : 'Ch có bài viết nào'}
                </p>
            )}

            {!isLoading.value && !error.value && filteredPosts.map(post => (
                <PostCard
                key={post.id}
                post={post}
                onNavigate={onNavigate}
                onDelete={handleDelete}
                />
            ))}
            
        </div>
    )
}

export default PostList