import express from 'express';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import categoryRouter from './routes/category.controller.js'
import postRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://internship-review-tuanthanh.vercel.app'  // bỏ dấu / ở cuối
  ],
  credentials: true
}))

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/posts', postRouter)
app.use('/api', commentRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
