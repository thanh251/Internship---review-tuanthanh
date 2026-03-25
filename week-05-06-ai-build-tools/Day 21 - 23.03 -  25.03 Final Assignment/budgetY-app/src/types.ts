export type ItemType = 'inc'| 'exp'

export interface BudgetItem{
    id: string,
    description: string,
    value: number,
}

export interface InputData{
    type: ItemType,
    description: string,
    value: number,
}

export interface BudgetData{
    total: number,
    income: number,
    expenses: number,
    percentage: number,
}