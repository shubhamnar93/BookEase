import { theme } from "@/src/theme";
import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Category({
  category,
  selectedCategory,
  setSelectedCategory,
}: {
  category: string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  const setCategory = useCallback(() => {
    setSelectedCategory(category);
  }, [category]);

  return (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryChip,
        selectedCategory === category && styles.categoryChipSelected,
      ]}
      onPress={setCategory}
      accessible={true}
      accessibilityRole="radio"
      accessibilityLabel={category}
      accessibilityState={{ selected: selectedCategory === category }}
      accessibilityHint={selectedCategory === category ? "Currently selected category" : "Double tap to select this category"}
    >
      <Text
        style={[
          styles.categoryChipText,
          selectedCategory === category && styles.categoryChipTextSelected,
        ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  categoryChip: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryChipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    ...theme.shadows.light,
  },
  categoryChipText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    fontWeight: "600",
  },
  categoryChipTextSelected: {
    color: theme.colors.surface,
  },
});
