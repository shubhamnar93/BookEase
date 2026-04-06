import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Provider } from "../types";

export default function ProviderCard({
  item,
  onPress,
}: {
  item: Provider;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={styles.card} 
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={item.name}
      accessibilityHint={`${item.category} service provider. Tap to view details and book appointment`}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.image}
        accessible={true}
        accessibilityLabel={`${item.name} profile image`}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View 
        style={styles.iconContainer}
        accessible={false}
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.primary}
          accessible={false}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.large,
    marginBottom: theme.spacing.medium,
    ...theme.shadows.light,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.tiny,
  },
  category: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    fontWeight: "500",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
