import { View, StyleSheet } from "react-native";
import React from "react";
import { Category, Transaction } from "../types";
import { categoryColors, categoryEmojies } from "../constants";
import Card from "./ui/Card";
import {
    Amount,
    CategoryItem,
    TransactionInfo,
} from "./TranscationsListItemSubs";

type TransactionListItemProps = {
    transaction: Transaction;
    category: Category | undefined;
};

export default function TransactionListItem({
    transaction,
    category,
}: TransactionListItemProps) {
    const iconName =
        transaction.type === "Expense" ? "minuscircle" : "pluscircle";
    const iconColor = transaction.type === "Expense" ? "red" : "green";
    const categoryColor = category ? categoryColors[category.name] : "gray";
    const categoryEmoji = category ? categoryEmojies[category.name] : "❓";
    return (
        <Card>
            <View style={styles.row}>
                <View style={{width: "40%", gap: 3}}>
                    <Amount
                        iconName={iconName}
                        color={iconColor}
                        amount={transaction.amount}
                    />
                    <CategoryItem
                        categoryColor={categoryColor}
                        categoryInfo={category}
                        emoji={categoryEmoji}
                    />
                </View>

                <TransactionInfo
                    id={transaction.id}
                    date={transaction.date}
                    description={transaction.description}
                />
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
