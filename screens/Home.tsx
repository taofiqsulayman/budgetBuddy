import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Category, Transaction } from "../types";
import { useSQLiteContext } from "expo-sqlite/next";
import TransactionsList from "../components/TransactionsList";

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

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
    };

    const deleteTransaction = async (id: number) => {
        db.withTransactionAsync(async () => {
            await db.runAsync(`DELETE FROM Transactions WHERE id = ?;`, [
                id,
            ]);
            // Update the transactions list
            await getData();
        }
        );
    }

    useEffect(() => {
        db.withTransactionAsync(async () => {
            await getData();
        });
    }, [db]);

    return (
        <ScrollView
            contentContainerStyle={{ padding: 15, paddingVertical: 170 }}
        >
            <TransactionsList
                transactions={transactions}
                categories={categories}
                deleteTransaction={deleteTransaction} />

        </ScrollView>
    );
};

export default Home;
