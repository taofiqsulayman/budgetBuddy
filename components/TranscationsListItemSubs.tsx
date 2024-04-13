import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Category } from "../types";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

export function TransactionInfo({
    id,
    date,
    description,
}: {
    id: number;
    date: number;
    description: string;
}) {
    return (
        <View style={{ flexGrow: 1, gap: 6, flexShrink: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {description}
            </Text>
            <Text>Transaction number {id}</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
                {new Date(date * 1000).toDateString()}
            </Text>
        </View>
    );
}

export function CategoryItem({
    categoryColor,
    categoryInfo,
    emoji,
}: {
    categoryColor: string;
    categoryInfo: Category | undefined;
    emoji: string;
}) {
    return (
        <View
            style={[
                subComponentsStyles.categoryContainer,
                { backgroundColor: categoryColor + "40" },
            ]}
        >
            <Text style={subComponentsStyles.categoryText}>
                {emoji} {categoryInfo?.name}
            </Text>
        </View>
    );
}

export function Amount({
    iconName,
    color,
    amount,
}: {
    iconName: "minuscircle" | "pluscircle";
    color: string;
    amount: number;
}) {
    return (
        <View style={subComponentsStyles.row}>
            <AntDesign name={iconName} size={18} color={color} />
            <AutoSizeText
                fontSize={32}
                mode={ResizeTextMode.max_lines}
                numberOfLines={1}
                style={[subComponentsStyles.amount, { maxWidth: "80%" }]}
            >
                ${amount}
            </AutoSizeText>
        </View>
    );
}

const subComponentsStyles = StyleSheet.create({
    amount: {
        fontSize: 32,
        fontWeight: "800",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    categoryContainer: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignSelf: "flex-start",
    },
    categoryText: {
        fontSize: 12,
    },
});
