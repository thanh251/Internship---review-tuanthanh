import { type BudgetItem, type ItemType, type InputData, type BudgetData } from './types'
// File này để thao tác DOM - đọc input user và render items ra màn hình

// Hàm quản lý ID/selector

const DOMstrings = {
    addType: '#add-type',
    addDescription: '#add-description',
    addValue: '#add-value',
    budgetTotal: '#budget-total',
    budgetIncome: '#budget-income',
    budgetExpenses: '#budget-expenses',
    budgetIncomePerc:'#budget-income-perc',
    budgetExpensesPerc:'#budget-expenses-perc',
    incomeList: '#income-list',
    expensesList: '#expenses-list',
}

// Hàm đọc dữ liệu từ form
export function getInput(): InputData {
    const typeEl = document.querySelector(DOMstrings.addType) as HTMLSelectElement
    const descEl = document.querySelector(DOMstrings.addDescription) as HTMLInputElement
    const valueEl = document.querySelector(DOMstrings.addValue) as HTMLInputElement
    return {
        type: typeEl.value as ItemType,
        description: descEl.value,
        value: parseFloat(valueEl.value),
    }
}

// Hàm render item mới vào danh sách
export function addListItem(item: BudgetItem, type: ItemType): void {
  const sign = type === 'inc' ? '+' : '-'
  const colorClass = type === 'inc' ? 'text-teal-600' : 'text-red-500'
  const listId = type === 'inc' ? DOMstrings.incomeList : DOMstrings.expensesList
  const html = `
    <li id="${item.id}" class="flex justify-between items-center bg-white px-4 py-3 rounded shadow-sm text-sm">
      <span>${item.description}</span>
      <div class="flex items-center gap-3">
        <span class="font-bold ${colorClass}">${sign} ${item.value.toFixed(2)}</span>
        <button data-id="${item.id}" data-type="${type}" class="delete-btn text-gray-300 hover:text-red-400 text-xs font-bold">✕</button>
      </div>
    </li>
  `

  // Chèn vào đúng danh sách
  const list = document.querySelector(listId)
  if (list) {
    list.insertAdjacentHTML('beforeend', html)
  }
}

// Xoá list ra khỏi DOM
export function deleteListItem(id: string): void {
    const el = document.getElementById(id)
    el?.parentNode?.removeChild(el)
}

// Cập nhật số liệ phần đầu
export function updateBudget(budget: BudgetData): void {
    const sign = budget.total >= 0 ? '+' : '-'

  const totalEl = document.querySelector(DOMstrings.budgetTotal)
  const incomeEl = document.querySelector(DOMstrings.budgetIncome)
  const expensesEl = document.querySelector(DOMstrings.budgetExpenses)
  const expPercEl = document.querySelector(DOMstrings.budgetExpensesPerc)

  if (totalEl) totalEl.textContent = `${sign} ${Math.abs(budget.total).toFixed(2)}`
  if (incomeEl) incomeEl.textContent = `+ ${budget.income.toFixed(2)}`
  if (expensesEl) expensesEl.textContent = `- ${budget.expenses.toFixed(2)}`
  if (expPercEl) expPercEl.textContent = budget.percentage > 0 ? `${budget.percentage}%` : '--'
}

//Xoá input khi thêm
export function clearInput(): void {
  const descEl = document.querySelector(DOMstrings.addDescription) as HTMLInputElement
  const valueEl = document.querySelector(DOMstrings.addValue) as HTMLInputElement
  descEl.value = ''
  valueEl.value = ''
  descEl.focus() 
}




