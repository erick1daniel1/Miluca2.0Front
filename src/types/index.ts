

export type Transaction = {
    id: number
    user: number
    type: string
    category: number
    amount: number
    date: string
    description: string
    category_detail: { id: number; name: string } | null
}

export type TransactionsForm = {
    type: string
    category: number | null
    amount: number
    date: string
    description: string
}