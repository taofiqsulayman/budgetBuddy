import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Category, Transaction } from "../types";
import { useSQLiteContext } from "expo-sqlite/next";
import Card from "./ui/Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { AddButton, CategoryButton } from "./AddTransactionSubComponents";

type AddTransactionProps = {
    insertTransaction: (transaction: Transaction) => void;
};

const AddTransaction = ({ insertTransaction }: AddTransactionProps) => {
    const [isAddingTransaction, setIsAddingTransaction] = useState(false);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [categoryId, setCategoryId] = useState(1);
    const [categories, setCategories] = useState<{ name: string }[]>([]);
    const [currentTab, setCurrentTab] = useState(0);

    const db = useSQLiteContext();

    const getExpenseType = async (currentTab: number) => {
        setCategory(currentTab === 0 ? "Expense" : "Income");
        const type = currentTab === 0 ? "Expense" : "Income";

        const categories = await db.getAllAsync<Category>(
            `SELECT * FROM Categories WHERE type = ?;`,
            [type]
        );
        setCategories(categories);
    };

    const handleSave = async () => {
        await insertTransaction({
            amount: Number(amount),
            description,
            category_id: categoryId,
            date: new Date().getTime() / 1000,
            type: category as "Income" | "Expense",
        });

        setAmount("");
        setDescription("");
        setIsAddingTransaction(false);
        setCategory("Expense");
        setCategoryId(1);
        setCurrentTab(0);
    }

    useEffect(() => {
        getExpenseType(currentTab);
    }, [currentTab]);

    return (
        <View style={{ marginBottom: 15 }}>
            {isAddingTransaction ? (
                <View>
                    <Card>
                        <TextInput
                            placeholder="$Amount"
                            style={{
                                fontSize: 16,
                                marginBottom: 15,
                                fontWeight: "bold",
                            }}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                // Remove any non-numeric characters before setting the state
                                const numericValue = text.replace(
                                    /[^0-9.]/g,
                                    ""
                                );
                                setAmount(numericValue);
                            }}
                        />

                        <TextInput
                            placeholder="Description"
                            style={{ marginBottom: 15 }}
                            onChangeText={setDescription}
                        />

                        <Text style={{ marginBottom: 6 }}>
                            Select a entry type
                        </Text>
                        <SegmentedControl
                            values={["Expense", "Income"]}
                            style={{ marginBottom: 15 }}
                            selectedIndex={0}
                            onChange={(event) => {
                                setCurrentTab(
                                    event.nativeEvent.selectedSegmentIndex
                                );
                            }}
                        />

                        {categories.map((category) => (
                            <CategoryButton
                                key={category.name}
                                // @ts-ignore
                                id={category.id}
                                title={category.name}
                                isSelected={type === category.name}
                                setTypeSelected={setType}
                                setCategoryId={setCategoryId}
                            />
                        ))}
                    </Card>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            paddingTop: 15,
                        }}
                    >
                        <Button
                            title="Cancel"
                            color="red"
                            onPress={() => setIsAddingTransaction(false)}
                        />
                        <Button title="Save" onPress={handleSave} />
                    </View>
                </View>
            ) : (
                <AddButton setIsAddingTransaction={setIsAddingTransaction} />
            )}
        </View>
    );
};

export default AddTransaction;

const styles = StyleSheet.create({});
