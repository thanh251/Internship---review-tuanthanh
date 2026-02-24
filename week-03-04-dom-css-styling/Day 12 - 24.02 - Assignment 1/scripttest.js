// Khi click nút xóa
btnDelete.addEventListener('click', (e) => {
    const todoItem = e.target.parentElement; // Tóm lấy thẻ <li> chứa nút này
    todoItem.remove(); // Xóa cả dòng
});
const todoList = document.querySelector('#todo-list');
console.log(`Cậu đang có ${todoList.children.length} công việc!`);

todoList.appendChild(newTodo);
const lastTodo = todoList.lastElementChild;
lastTodo.style.backgroundColor = 'yellow'; // Highlight cái vừa thêm

const inputName = document.querySelector('#name');
if(inputName.value === "") {
    const errorMsg = inputName.nextElementSibling; // Thẻ span báo lỗi ngay sau input
    errorMsg.textContent = "Cậu quên nhập tên rồi kìa!";
}

const todoItem = document.createElement('li'); // Tạo thẻ <li> mới trong bộ nhớ

todoItem.textContent = 'Học DOM tuần 3-4'; // Gán chữ an toàn, không sợ mã độc

const list = document.querySelector('#todo-list'); //
list.appendChild(todoItem); // Đưa công việc mới vào cuối danh sách

list.insertBefore(todoItem, list.firstChild); // Chèn công việc mới lên đầu danh sách


// Gắn sự kiện duy nhất lên thẻ cha <ul>
todoList.addEventListener('click', (e) => {
    // Nếu click vào nút Delete
    if (e.target.classList.contains('delete-btn')) {
        if (confirm('Cậu chắc chắn muốn xóa chứ?')) {
            e.target.parentElement.remove(); // Dùng parentElement để xóa cả dòng <li>
        }
    } 
    // Nếu click vào dòng chữ (thẻ <li>)
    else if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed'); // Bật/tắt gạch ngang chữ
    }
});