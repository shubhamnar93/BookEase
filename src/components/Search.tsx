import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../theme";
import { memo } from "react";

function Search({
  placeholder,
  value,
  onChangeText,
  accessibilityLabel,
  accessibilityHint,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}) {
  return (
    <View
      style={styles.searchContainer}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}>
      <Ionicons
        name="search"
        size={20}
        color={theme.colors.textSecondary}
        style={styles.searchIcon}
        accessible={false} // Decorative
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        accessible={true}
        accessibilityRole="search"
        accessibilityLabel="Search"
        accessibilityHint="Type to search for providers or services"
        textContentType="none"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.medium,
    marginTop: theme.spacing.large,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.borderRadius.large,
    ...theme.shadows.light,
  },
  searchIcon: {
    marginRight: theme.spacing.small,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.medium,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.text,
  },
});

export default memo(Search);
