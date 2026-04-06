import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { memo } from "react";

function AuthFooter({
  text,
  linkText,
  onPress,
}: {
  text: string;
  linkText: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.footer}>
      <Text style={styles.link}>{text} </Text>
      <TouchableOpacity
        onPress={onPress}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={linkText}
        accessibilityHint={`Navigate to ${linkText.toLowerCase()}`}>
        <Text style={[styles.linkBold, { textDecorationLine: "underline" }]}>
          {linkText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.xlarge,
  },
  link: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.medium,
  },
  linkBold: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
  },
});

export default memo(AuthFooter);
