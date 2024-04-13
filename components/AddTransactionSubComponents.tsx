import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function CategoryButton({
    id,
    title,
    isSelected,
    setTypeSelected,
    setCategoryId,
}: {
    id: number;
    title: string;
    isSelected: boolean;
    setTypeSelected: React.Dispatch<React.SetStateAction<string>>;
    setCategoryId: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <TouchableOpacity
            onPress={() => {
                setTypeSelected(title);
                setCategoryId(id);
            }}
            activeOpacity={0.6}
            style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isSelected ? "#007BFF20" : "#00000020",
                borderRadius: 15,
                marginBottom: 6,
            }}
        >
            <Text
                style={{
                    fontWeight: "700",
                    color: isSelected ? "#007BFF" : "#000000",
                    marginLeft: 5,
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export function AddButton({
    setIsAddingTransaction,
}: {
    setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <TouchableOpacity
            onPress={() => setIsAddingTransaction(true)}
            activeOpacity={0.6}
            style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",

                justifyContent: "center",
                backgroundColor: "#007BFF20",
                borderRadius: 15,
            }}
        >
            <MaterialIcons
                name="add-circle-outline"
                size={24}
                color="#007BFF"
            />
            <Text
                style={{ fontWeight: "700", color: "#007BFF", marginLeft: 5 }}
            >
                New Entry
            </Text>
        </TouchableOpacity>
    );
}
