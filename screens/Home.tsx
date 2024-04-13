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
            <TransactionsList
                transactions={transactions}
                categories={categories} deleteTransaction={function (id: number): Promise<void> {
                    throw new Error("Function not implemented.");
                } }            />
        </ScrollView>
    );
};

export default Home;
