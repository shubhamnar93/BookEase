import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";

export default function BackButton({
  variant,
}: {
  variant: "floating" | "inline";
}) {
  const handleBack = () => {
    router.back();
  };
  return (
    <TouchableOpacity
      onPress={handleBack}
      style={[
        variant === "floating" && styles.floating,
        variant === "inline" && styles.inline,
      ]}>
      <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floating: {
    position: "absolute",
    top: 50,
    left: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.medium,
  },
  inline: {
    marginRight: theme.spacing.medium,
  },
});
