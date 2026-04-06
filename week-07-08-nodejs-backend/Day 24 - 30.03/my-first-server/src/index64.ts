export {};
// 1. Khai báo interface CreateUserInput: name(string), email(string)
// 2. Khai báo interface User: id(number), name(string), email(string), createdAt(string)
interface CreateUserInput {
  name: string;
  email: string;
}

interface User{
  id: number;
  name: string;
  email: string;
  createdAt: string;
}
// Mảng giả lập database
let users: User[]=[
  {id: 1, name: "Nguyễn An", email: "an@gmail.com", createdAt: new Date().toISOString()},
  {id: 2, name: "Trần Bình", email: "binh@gmail.com", createdAt: new Date().toISOString()},
];
// 3. Viết hàm async createUser(input: CreateUserInput): Promise<User>
// Giả lập Prisma: tạo user mới với id tự tăng và createdAt là new Date().toISOString()
// Push vào mảng users, rồi return user vừa tạo
async function createUser(input: CreateUserInput): Promise<User>{
  return new Promise ((resolve) => {
    const newUser: User = {
      id: users.length + 1,
      name: input.name,
      email: input.email,
      createdAt: new Date().toISOString(),
    }
    users.push(newUser);
    resolve(newUser);
  })
}

// 4. Viết hàm async handleCreateUser(name: string, email: string)
// - Validate: nếu thiếu ncoame hoặc email → in "400: Thiếu thông tin"
// - Gọi createUser(), in ra "201: Đã tạo user [name] với id=[id]"
// - Bắt lỗi → in "500: Lỗi server"
async function handleCreateUser(name: string, email: string){
  try {
    if (!name || !email) {
      console.log("400: Thiếu thông tin");
      return
    }
    const user = await createUser({name,email});
    console.log(`201: Đã tạo user ${user.name} với id=${user.id}`);
  }
  catch (error) {
    console.log("500: Lỗi server");
  }
}

// Test 3 trường hợp:
handleCreateUser("Nguyễn An", "an@gmail.com")  
handleCreateUser("", "an@gmail.com")            
handleCreateUser("Trần Bình", "")             

