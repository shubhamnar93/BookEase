import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import { IconName } from "../types";

export default function BookSectionAppointment({
  iconName,
  title,
}: {
  iconName: IconName;
  title: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Ionicons 
        name={iconName} 
        size={24} 
        color={theme.colors.primary}
        accessible={false} // Decorative
      />
      <Text 
        style={styles.sectionTitle}
        accessibilityRole="header"
        accessibilityLabel={title}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.large,
    marginBottom: theme.spacing.xlarge,
    ...theme.shadows.medium,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.medium,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    color: theme.colors.text,
    marginLeft: theme.spacing.small,
  },
});
