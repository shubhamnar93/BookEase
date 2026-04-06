import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { IconName } from "../types";

export default function Input({
  name,
  setName,
  iconName,
  placeholder,
}: {
  name: string;
  setName: (text: string) => void;
  iconName: IconName;
  placeholder: string;
}) {
  return (
    <View style={styles.inputWrapper}>
      <Ionicons
        name={iconName}
        size={20}
        color={theme.colors.textSecondary}
        style={styles.inputIcon}
      />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={theme.colors.textSecondary}
        value={name}
        onChangeText={setName}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
  },
  inputIcon: {
    marginRight: theme.spacing.small,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.medium,
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
  },
});
