import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { IconName } from "../types";

export default function Button({
  label,
  iconName,
  onPress,
}: {
  label: string;
  iconName: IconName;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
      <Ionicons name={iconName} size={20} color={theme.colors.surface} />
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
    marginTop: theme.spacing.medium,
    ...theme.shadows.primary,
  },
  buttonText: {
    color: theme.colors.surface,
    fontWeight: "bold",
    fontSize: theme.fontSizes.large,
    marginRight: theme.spacing.small,
  },
});
