 import {Command} from 'commander';
 import fs from 'fs/promises'; // tương tác với ổ cứng
 import path from 'path'; // chuẩn hoá đường dẫn
 import {Task, Priority} from "./type"
 
 const program = new Command(); // tạo lệnh add ,del, các thứ
 const DB_PATH = path.join(__dirname,'task.json');

 //Lấy dữ liệu từ bộ nhớ
 /*
async : giúp xác định một hàm rằng là hàm này cần thời gian chạy
await : năm bên trong hàm async, đợi code trong await chạy xong rồi mới chạy tiếp
 Promise < Task[]: đảm bảo an toàn dữ liệu; 
 Promise đại diện giá trị sẽ có trong tương lai; 
 <Task[]> :  kết quả trả về sẽ là một mảng các đối tượng Task
 json.parse(data) : parse giúp đọc dữ liệu trong task.json thành một đối tượng JS
 catch {return [] } :  tránh sập khi chưea có file, lỗi sẽ tạo file json rỗng
 async function writeTasks(tasks: Task[]): Promise<void>{
    await fs.writeFile(DB_PATH, JSON.stringify(tasks,null,2))
 }
void : không trả về giá trị nào, chỉ thực thi hàm mà thôi
 */
 async function readTasks(): Promise<Task[]>{
    try{
        const data = await fs.readFile(DB_PATH,'utf-8');
        return JSON.parse(data);
    }catch{
        return [];
    }
 }
 async function writeTasks(tasks: Task[]): Promise<void>{
    await fs.writeFile(DB_PATH, JSON.stringify(tasks,null,2))
 }