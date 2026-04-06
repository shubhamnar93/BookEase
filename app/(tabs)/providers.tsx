import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import { PROVIDERS } from "../../src/data/providers";

export default function Providers() {
  const router = useRouter();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  const categories = useMemo(() => {
    const cats = PROVIDERS.map((p) => p.category);
    return ["All", ...new Set(cats)];
  }, []);

  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter((provider) => {
      const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || provider.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search providers..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextSelected,
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProviders}
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
    paddingTop: theme.spacing.xlarge + 20,
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
  categoriesContainer: {
    marginTop: theme.spacing.medium,
    marginBottom: theme.spacing.small,
  },
  categoriesScroll: {
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.small,
  },
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
