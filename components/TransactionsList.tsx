import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Category, Transaction } from "../types";
import TransactionListItem from "./TransactionListItem";

type TransactionListProps = {
    transactions: Transaction[];
    categories: Category[];
    deleteTransaction: (id: number) => Promise<void>;
};

const TransactionsList = ({
    transactions,
    categories,
    deleteTransaction,
}: TransactionListProps) => {
    return (
        <View style={{ gap: 10 }}>
            {transactions.map((transaction) => {
                const category = categories.find(
                    (category) => category.id === transaction.category_id
                );

                return (
                    <TouchableOpacity
                        key={transaction.id}
                        activeOpacity={0.7}
                        onLongPress={() => deleteTransaction(transaction.id)}
                    >
                        <TransactionListItem
                            transaction={transaction}
                            category={category}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TransactionsList;
