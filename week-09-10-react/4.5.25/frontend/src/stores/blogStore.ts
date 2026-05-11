import { signal } from '@preact/signals-react'

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

export const posts = signal<Post[]>([])
export const isLoading = signal(false)
export const error = signal('')
// posts — danh sách bài viết, <Post[]> — kiểu dữ liệu là mảng các Post
// isLoading — đang fetch data không? true → hiện "Đang tải...", false → hiện danh sách
// error — lưu thông báo lỗi nếu fetch thất bại chuỗi rỗng '' = không có lỗi
