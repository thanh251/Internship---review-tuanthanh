import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/stores/authStore'

type Post = {
    id: string
    title: string
    content: string
    published: boolean
    author: {
        id: string
        name: string
    }
    createdAt: string
}

type PostCardProps = {
    post: Post
    onNavigate: (page: string, postId?: string) => void
    onDelete: (postID: string) => void
}

function PostCard({post, onNavigate, onDelete }: PostCardProps){
    const isAuthor = currentUser.value?.id === post.author.id
    const date = new Date(post.createdAt).toLocaleDateString('vi-VN')

    return (
        <Card
        className='mb-4 cursor-pointer hover:shadow-md transition-shadow duration-200'
        onClick={() => onNavigate('post', post.id)}
        >
            <CardHeader>
                <CardTitle className='text-lg'>{post.title}</CardTitle>
                <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500'>
                        {post.author.name} vào {date}
                    </p>

                    {isAuthor && (
                        <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete(post.id)
                        }}
                    >
                        Xoá
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-gray-700 line-clamp-2">{post.content}</p>
            </CardContent>
        </Card>
    )
}
export default PostCard