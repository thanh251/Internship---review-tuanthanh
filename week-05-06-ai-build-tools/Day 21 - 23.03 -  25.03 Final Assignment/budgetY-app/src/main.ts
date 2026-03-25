import { addItem, deleteItem, calculateBudget } from './budgetController'
import { getInput, addListItem, deleteListItem, updateBudget, clearInput } from './uiController'


// xủ lý khi thêm item mới
function ctrlAddItem(): void {
  const input = getInput()
  if (!input.description || isNaN(input.value)|| input.value <= 0) return

  const newItem = addItem(input.type, input.description, input.value)
  addListItem(newItem, input.type)
  const budget = calculateBudget()
  updateBudget(budget)
  clearInput()
}

//xử lý xoá item
function ctrlDeleteItem(event: MouseEvent): void {
  const target = event.target as HTMLElement
  if (!target.classList.contains('delete-btn')) return
  const id = target.dataset.id
  const type = target.dataset.type 
  if (!id || !type) return

  deleteItem(type as 'inc'| 'exp', id)
  deleteListItem(id)
  const budget = calculateBudget()
  updateBudget(budget)
}

//Chạy web
function init(): void {
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') ctrlAddItem()
  })

  document.addEventListener('click', ctrlDeleteItem )
}

init()