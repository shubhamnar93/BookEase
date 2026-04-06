import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { PROVIDERS } from "../../src/data/providers";
import BackButton from "@/src/components/BackButton";
import Button from "@/src/components/Button";
import ProviderContent from "@/src/components/ProviderContent";
import { memo } from "react";

function ProviderDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const provider = PROVIDERS.find((p) => p.id === id);

  const handleBookAppointment = () => {
    router.push(`/book/${provider?.id}`);
  };

  if (!provider)
    return (
      <View
        style={styles.errorContainer}
        accessible={true}
        accessibilityRole="alert"
        accessibilityLabel="Error: Provider not found">
        <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>Provider not found</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: provider.image }}
            style={styles.heroImage}
            accessible={true}
            accessibilityLabel={`${provider.name}, ${provider.category} service`}
          />
          <BackButton variant="floating" />
        </View>

        <ProviderContent
          category={provider.category}
          name={provider.name}
          description={provider.description}
        />
      </ScrollView>

      <View style={styles.footerContainer}>
        <Button
          onPress={handleBookAppointment}
          label="Book Appointment"
          iconName="arrow-forward"
          size={20}
          padding="large"
          accessibilityLabel="Book appointment with this provider"
          accessibilityHint={`Book an appointment with ${provider?.name}`}
        />
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
  errorText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.error,
    textAlign: "center",
    marginTop: theme.spacing.medium,
  },
});
export default memo(ProviderDetails);
