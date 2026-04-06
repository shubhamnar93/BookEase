import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import { memo } from "react";

function ProviderContent({
  category,
  description,
  name,
}: {
  category: string;
  description: string;
  name: string;
}) {
  return (
    <View style={styles.contentCard}>
      <View style={styles.profileHeader}>
        <Text
          style={styles.name}
          accessibilityRole="header"
          accessibilityLabel={name}>
          {name}
        </Text>
        <View
          style={styles.categoryBadge}
          accessible={true}
          accessibilityLabel={`Category: ${category}`}
          accessibilityRole="none">
          <Ionicons
            name="briefcase"
            size={16}
            color={theme.colors.primary}
            accessible={false} // Decorative
          />
          <Text style={styles.category}>{category}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.descriptionSection}>
        <Text
          style={styles.sectionTitle}
          accessibilityRole="header"
          accessibilityLabel="About section">
          About
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contentCard: {
    marginTop: -40,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: theme.spacing.large,
    minHeight: 500,
    ...theme.shadows.medium,
  },
  profileHeader: {
    marginBottom: theme.spacing.large,
  },
  name: {
    fontSize: theme.fontSizes.xxlarge,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
    letterSpacing: -0.5,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primaryLight + "20",
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.full,
    alignSelf: "flex-start",
  },
  category: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.primary,
    marginLeft: theme.spacing.small,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.large,
  },
  descriptionSection: {
    marginBottom: theme.spacing.xlarge,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.medium,
  },
  description: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    lineHeight: 26,
  },
});

export default memo(ProviderContent);
