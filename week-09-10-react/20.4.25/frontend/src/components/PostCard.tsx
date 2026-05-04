import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { currentUser } from '../stores/authStore'

type PostCardProps = {
  title: string
  author: string
  description: string
}

function PostCard({ title, author, description }: PostCardProps) {
  const [likes, setLikes] = useState(0)
  const canDelete = currentUser.value?.username === author

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-500">Tác giả: {author}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{description}</p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLikes(likes + 1)}
          >
            Thích {likes}
          </Button>

          {canDelete && (
            <Button variant="destructive" size="sm">
              Xoá bài
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard