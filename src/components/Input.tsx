import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { IconName } from "../types";
import { memo } from "react";

function Input({
  accessibilityHint,
  accessibilityLabel,
  iconName,
  name,
  placeholder,
  secureTextEntry,
  setName,
}: {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  iconName: IconName;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  setName: (text: string) => void;
}) {
  return (
    <View
      style={styles.inputWrapper}
      accessible={false} // Parent is not accessible
    >
      <Ionicons
        name={iconName}
        size={20}
        color={theme.colors.textSecondary}
        style={styles.inputIcon}
        accessible={false} // Icon is decorative
      />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={theme.colors.textSecondary}
        value={name}
        onChangeText={setName}
        accessible={true}
        accessibilityLabel={accessibilityLabel || placeholder}
        accessibilityHint={accessibilityHint}
        accessibilityRole="none" // Remove default role
        secureTextEntry={secureTextEntry}
        autoComplete={placeholder === "Email" ? "email" : "off"}
        textContentType={
          placeholder === "Email"
            ? "emailAddress"
            : placeholder === "Password"
              ? "password"
              : "none"
        }
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

export default memo(Input);
