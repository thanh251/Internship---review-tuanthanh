const input = document.querySelector('#todo-input')
const addBtn = document.querySelector('#add-btn');
const todoList = document. querySelector('#todo-list')

addBtn.addEventListener('click',() => {
    const text = input.value.trim() 
    if (text !== ""){
        createTodoItem(text);
        input.value=""; // xoá ô nhập khi thêm
    }
});

function createTodoItem(text){
    const li = document.createElement('li')
    li.textContent = text;
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.className = 'delete-btn';

    li.appendChild(delBtn); // gắn nút xoá vào thẻ li
    todoList.appendChild(li); // gắn thẻ li vao ul
};

todoList.addEventListener ('click', (e) => {
    if (e.target.classList.contains('delete-btn')){
        if (confirm('xoá ko')){
            e.target.parentElement.remove();
        }
    }
    else if (e.target.tagName === 'LI' ){
        e.target.classList.toggle('completed');
    }
});


function save(){
    const todos = [];
    document.querySelectorAll('#todo-list li').forEach(li =>{
        todos.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myTodos', JSON.stringify(todos));
}