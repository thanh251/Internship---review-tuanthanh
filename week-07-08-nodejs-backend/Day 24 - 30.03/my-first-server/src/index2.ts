import express from 'express'

const app = express()
const PORT = 3000

// Middleware: cho phép đọc JSON
app.use(express.json())

// Route 1: Kiểm tra server có sống không
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server đang chạy!' })
})

// Route 2: Danh sách users giả
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Nguyễn An', email: 'an@gmail.com' },
    { id: 2, name: 'Trần Bình', email: 'binh@gmail.com' },
  ]
  res.json(users)
})

// Route 3: Tạo user mới
app.post('/api/users', (req, res) => {
  const { name, email } = req.body        // lấy dữ liệu từ request
  console.log('Nhận được:', name, email)
  res.status(201).json({
    id: 3,
    name,
    email,
    message: 'Tạo user thành công!'
  })
})

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`)
})