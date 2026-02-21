import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import { Task, Priority } from './type.js';

const program = new Command();
const DB_PATH = path.join(__dirname, 'tasks.json');

// đọc file
async function readTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return []; // Trả về mảng rỗng nếu chưa có file
  }
}

async function writeTasks(tasks: Task[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
}

// --- LOGIC CHÍNH (CRUD) ---
program
  .name('task-manager')
  .description('task-mng')
  .version('1.0.0');

// Thêm cviec mới
program
  .command('add <title>')
  .option('-p, --priority <priority>', 'Độ ưu tiên (low|medium|high)', 'medium')
  .action(async (title: string, options) => {
    if (title.trim().length < 3) {
      return console.error('❌ Lỗi: Tên công việc phải có ít nhất 3 ký tự!');
    }

    const tasks = await readTasks();
    const newTask: Task = {
      id: Date.now().toString(), 
      title: title.trim(),
      completed: false,
      priority: options.priority as Priority,
    };

    tasks.push(newTask);
    await writeTasks(tasks);
    console.log(`Đã thêm: "${title}" (Ưu tiên: ${options.priority})`);
  });

// list và filter task
program
  .command('list')
  .option('-p, --priority <level>', 'Lọc theo độ ưu tiên')
  .action(async (options) => {
    let tasks = await readTasks();
    if (options.priority) {
      tasks = tasks.filter(t => t.priority === options.priority);
    }
    if (tasks.length === 0) return console.log('📭 Danh sách trống.');
    tasks.forEach(t => {
      const status = t.completed ? '[✔]' : '[ ]';
      console.log(`${t.id} | ${status} | ${t.priority.padEnd(6)} | ${t.title}`);
    });
  });
// xoá task
program
  .command('remove <id>')
  .action(async (id: string) => {
    const tasks = await readTasks();
    const newTasks = tasks.filter(t => t.id !== id);
    if (tasks.length === newTasks.length) {
      return console.log(' Không tìm thấy ID');
    }
    await writeTasks(newTasks);
    console.log('Đã xóa task');
  });

// updatte trạng thái
program
  .command('done <id>')
  .action(async (id: string) => {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      await writeTasks(tasks);
      console.log(`Xong việc: ${task.title}`);
    } else {
      console.log('Không thấy ID.');
    }
  });
program.parse(process.argv);