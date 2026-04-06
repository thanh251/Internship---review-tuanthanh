const users = [
  { id: 1, name: "Nguyễn An",   email: "an@gmail.com",    active: true,  role: "admin"  },
  { id: 2, name: "Trần Bình",   email: "binh@gmail.com",  active: false, role: "user"   },
  { id: 3, name: "Lê An Khoa",  email: "khoa@gmail.com",  active: true,  role: "user"   },
  { id: 4, name: "Phạm Dung",   email: "dung@gmail.com",  active: true,  role: "user"   },
  { id: 5, name: "Hoàng Anh",   email: "anh@gmail.com",   active: false, role: "admin"  },
]

// Viết hàm searchUsers(nameQuery, onlyActive)
// nameQuery: tìm tên chứa chuỗi này (không phân biệt hoa thường)
// onlyActive: true/false — lọc theo active hay không



// Test:
// searchUsers("an", true)   → 2 users: Nguyễn An và Lê An Khoa
// searchUsers("an", false)  → 3 users: Nguyễn An, Lê An Khoa, Hoàng Anh
// searchUsers("", true)     → 3 users active

/*const searchUsers = (nameQuery: string, onlyActive: boolean) => {
    return users.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(nameQuery.toLowerCase())
        const activeMatch = onlyActive ? user.active : true
        return nameMatch && activeMatch
    })
}
    */

const searchUsers = (nameQuery: string, onlyActive: boolean) => {
    return users
    .filter(
        user => {
            const nameMatch = user.name.toLowerCase().includes(nameQuery.toLowerCase())
            const activeMatch =onlyActive ? user.active : true
            return nameMatch && activeMatch
        }
    )
    .map(
        user => ({id: user.id, name: user.name, email: user.email})
    )
}