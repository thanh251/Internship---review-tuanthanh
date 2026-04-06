import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

//database ảo

let users = [
  {id: 1, name: 'Nguyễn An', email: 'an@gmail.com'},
  {id: 2, name: 'Trần Bình', email: 'binh@gmail.com'},
]

//get /api/users ; lấy tất cả users

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)       
  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({ error: 'Không tìm thấy user' })
  }

  res.json(user)
})

// POST /api/users — Tạo user mới - thực tế: người dùng đăng ký tài khoản
app.post('/api/users', (req, res) => {
  const { name, email } = req.body

  // Validation: thiếu thông tin thì báo lỗi ngay
  if (!name || !email) {
    return res.status(400).json({ error: 'Thiếu name hoặc email' })
  }

  const newUser = {
    id: users.length + 1,   // thực tế DB tự tạo id
    name,
    email,
  }

  users.push(newUser)                         
  res.status(201).json(newUser)              
})

// PUT /api/users/:id — Cập nhật user Thực tế: người dùng sửa thông tin cá nhân
app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const { name, email } = req.body
  const index = users.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy user' })
  }

  users[index] = { id, name, email }          // ghi đè toàn bộ
  res.json(users[index])
})

// DELETE /api/users/:id — Xóa user, admin xóa tài khoản vi phạm
app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = users.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy user' })
  }

  users.splice(index, 1)                     
  res.status(204).send()                      
})

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`)
})