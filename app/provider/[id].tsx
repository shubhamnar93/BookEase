import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PROVIDERS } from "../../src/data/providers";

export default function ProviderDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const provider = PROVIDERS.find((p) => p.id === id);

  if (!provider)
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>Provider not found</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: provider.image }} style={styles.heroImage} />
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.profileHeader}>
            <Text style={styles.name}>{provider.name}</Text>
            <View style={styles.categoryBadge}>
              <Ionicons name="briefcase" size={16} color={theme.colors.primary} />
              <Text style={styles.category}>{provider.category}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{provider.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => router.push(`/book/${provider.id}`)}
          style={styles.bookButton}
          activeOpacity={0.8}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
          <Ionicons name="arrow-forward" size={20} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 120, // space for fixed footer
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 350,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.medium,
  },
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
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.large,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.primary,
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.full,
  },
  bookButtonText: {
    color: theme.colors.surface,
    fontWeight: "bold",
    fontSize: theme.fontSizes.large,
    marginRight: theme.spacing.small,
  },
  errorText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.error,
    textAlign: "center",
    marginTop: theme.spacing.medium,
  },
});
