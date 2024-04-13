import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Category, Transaction, TransactionsByMonth } from "../types";
import { useSQLiteContext } from "expo-sqlite/next";
import { getMonthStartEndUnixTimestamps } from "../utils";
import TransactionsList from "../components/TransactionsList";
import TransactionSummary from "../components/TransactionSummary";

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionsByMonth, setTransactionsByMonth] =
        useState<TransactionsByMonth>({
            totalExpenses: 0,
            totalIncome: 0,
        });

    const db = useSQLiteContext();

    const getData = async () => {
        const transactionsResult = await db.getAllAsync<Transaction>(
            `SELECT * FROM Transactions ORDER BY date DESC;`
        );
        setTransactions(transactionsResult);

        const categoriesResult = await db.getAllAsync<Category>(
            `SELECT * FROM Categories;`
        );
        setCategories(categoriesResult);

        const now = new Date();
        const { startOfMonthUnix, endOfMonthUnix } =
            getMonthStartEndUnixTimestamps(now);

        const transactionsByMonth = await db.getAllAsync<TransactionsByMonth>(
            `
            SELECT
                COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) AS totalExpenses,
                COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) AS totalIncome
            FROM Transactions
            WHERE date >= ? AND date <= ?;
            `,
            [startOfMonthUnix, endOfMonthUnix]
        );
        setTransactionsByMonth(transactionsByMonth[0]);
    };

    const deleteTransaction = async (id: number) => {
        db.withTransactionAsync(async () => {
            await db.runAsync(`DELETE FROM Transactions WHERE id = ?;`, [id]);
            await getData();
        });
    };

    useEffect(() => {
        db.withTransactionAsync(async () => {
            await getData();
        });
    }, [db]);

    return (
        <ScrollView
            contentContainerStyle={{ padding: 15, paddingVertical: 170 }}
        >
            <TransactionSummary
                totalIncome={transactionsByMonth.totalIncome}
                totalExpenses={transactionsByMonth.totalExpenses}
            />
            <TransactionsList
                transactions={transactions}
                categories={categories}
                deleteTransaction={deleteTransaction}
            />
        </ScrollView>
    );
};

export default Home;
