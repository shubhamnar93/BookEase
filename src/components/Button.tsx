import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { IconName } from "../types";

export default function Button({
  label,
  iconName,
  onPress,
  size = 20,
  padding = "medium",
  disabled = false,
  style,
  marginTop = false,
  accessibilityLabel,
  accessibilityHint,
}: {
  label: string;
  iconName: IconName;
  onPress: () => void;
  size?: number;
  padding?: "medium" | "large";
  marginTop?: boolean;
  disabled?: boolean;
  style?: object;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}) {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      style={{
        ...styles.button,
        ...(padding === "large" ? styles.largePadding : {}),
        ...(disabled ? styles.disabledButton : {}),
        ...(marginTop ? styles.marginTop : {}),
        ...style,
      }}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{label}</Text>
      <Ionicons
        name={iconName}
        size={size}
        color={disabled ? theme.colors.textSecondary : theme.colors.surface}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.primary,
  },
  marginTop: {
    marginTop: theme.spacing.medium,
  },
  largePadding: {
    padding: theme.spacing.large,
  },
  disabledButton: {
    backgroundColor: theme.colors.border,
  },
  buttonText: {
    color: theme.colors.surface,
    fontWeight: "bold",
    fontSize: theme.fontSizes.large,
    marginRight: theme.spacing.small,
  },
});
