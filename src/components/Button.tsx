import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { IconName } from "../types";
import { memo } from "react";

function Button({
  accessibilityHint,
  accessibilityLabel,
  disabled = false,
  iconName,
  label,
  marginTop = false,
  onPress,
  padding = "medium",
  size = 20,
  style,
}: {
  accessibilityHint?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
  iconName: IconName;
  label: string;
  marginTop?: boolean;
  onPress: () => void;
  padding?: "medium" | "large";
  size?: number;
  style?: object;
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

export default memo(Button);
