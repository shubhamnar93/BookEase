import { theme } from "@/src/theme";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { PROVIDERS } from "../../src/data/providers";
import TabsHeader from "@/src/components/TabsHeader";
import Search from "@/src/components/Search";
import Category from "@/src/components/Category";
import ProviderCard from "@/src/components/ProviderCard";

export default function Providers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const router = useRouter();

  const categories = useMemo(() => {
    const cats = PROVIDERS.map((p) => p.category);
    return ["All", ...new Set(cats)];
  }, []);

  const filteredProviders = useMemo(() => {
    return PROVIDERS.filter((provider) => {
      const matchesSearch = provider.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || provider.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <View style={styles.container}>
      <TabsHeader title="Find Your Provider" iconName={"people"} />
      <Search
        placeholder="Search providers..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        accessibilityLabel="Search providers"
        accessibilityHint="Type to search for providers or services"
      />

      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}>
          {categories.map((category) => (
            <Category
              key={category}
              category={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProviders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        accessible={true}
        accessibilityLabel={`${filteredProviders.length} providers found`}
        accessibilityHint={selectedCategory !== "All" ? `Filtered by ${selectedCategory}` : "Showing all providers"}
        renderItem={({ item }) => (
          <ProviderCard
            item={item}
            onPress={() => router.push(`/provider/${item.id}`)}
          />
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
  categoriesContainer: {
    marginTop: theme.spacing.medium,
    marginBottom: theme.spacing.small,
  },
  categoriesScroll: {
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.small,
  },
  listContainer: {
    padding: theme.spacing.medium,
    paddingBottom: 100, // Space for bottom tabs
  },
});
