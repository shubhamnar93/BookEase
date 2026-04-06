import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import { PROVIDERS } from "../../src/data/providers";

export default function Providers() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primaryLight, theme.colors.primary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerTitleContainer}>
          <Ionicons name="people" size={28} color={theme.colors.surface} />
          <Text style={styles.headerTitle}>Find Your Provider</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={28} color={theme.colors.surface} />
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={PROVIDERS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/provider/${item.id}`)}
            style={styles.card}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.primary}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.medium,
    paddingTop: theme.spacing.xlarge + 20, // Add top padding for status bar area
    paddingBottom: theme.spacing.large,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...theme.shadows.medium,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButton: {
    padding: theme.spacing.small,
  },
  headerTitle: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: theme.colors.surface,
    marginLeft: theme.spacing.medium,
    letterSpacing: 0.5,
  },
  listContainer: {
    padding: theme.spacing.medium,
    paddingBottom: 100, // Space for bottom tabs
  },
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
