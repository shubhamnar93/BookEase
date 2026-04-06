import { ReactNode } from "react";
import { View } from "react-native";
import BookSectionAppointment from "./BookSectionHeader";
import { StyleSheet } from "react-native";
import { theme } from "../theme";
import { IconName } from "../types";

export default function BookCard({
  children,
  iconName,
  title,
}: {
  children: ReactNode;
  iconName: IconName;
  title: string;
}) {
  return (
    <View style={styles.card}>
      <BookSectionAppointment iconName={iconName} title={title} />
      {children}
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
});
