import { type BudgetItem, type ItemType, type BudgetData } from './types'

// Data của app là bộ nhớ của app
const data = {
    items:{
        inc:[] as BudgetItem[], //mảng income
        exp:[] as BudgetItem[], // mảng expanses
    },
    totals:{
        inc: 0, //tổng income
        exp: 0, // tổng expanses
    }
}

// Hàm xử lý Data
export function addItem(type: ItemType, description: string, value: number): BudgetItem {
    const id = `${type}-${data.items[type].length}`
    const newItem : BudgetItem = {id, description, value}
    data.items[type].push(newItem)
    return newItem;
}

//XOá item
export function deleteItem (type : ItemType, id : string): void{
    const items = data.items[type]
    const index = items.findIndex(item => item.id === id)
    if (index !== -1){
        items.splice(index, 1)
    }
}

// tính toán
export function calculateBudget(): BudgetData{
    const totalIncome = data.items.inc.reduce((sum, item) => sum + item.value,0)
    const totalExpenses = data.items.exp.reduce((sum, item) => sum + item.value,0)
    const total = totalIncome - totalExpenses
    const percentage = totalIncome > 0
        ? Math.round(totalExpenses / totalIncome) * 100
        :0
    data.totals.inc=totalIncome
    data.totals.exp=totalExpenses
return {total, income: totalIncome, expenses: totalExpenses, percentage}
}