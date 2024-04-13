export interface Transaction {
    id?: number;
    amount: number;
    category_id: number;
    date: number;
    description: string;
    type: "Income" | "Expense";
}

export interface Category {
    id: number;
    name: string;
    type: "Income" | "Expense";
}

export interface TransactionsByMonth {
    totalIncome: number;
    totalExpenses: number;
}
