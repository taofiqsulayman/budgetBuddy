import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Category, Transaction } from "../types";

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
        <View>
            {transactions.map((transaction) => (
                <TouchableOpacity
                    key={transaction.id}
                    activeOpacity={0.7}
                    onLongPress={() => deleteTransaction(transaction.id)}
                >
                    <Text>{transaction.description}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default TransactionsList;
