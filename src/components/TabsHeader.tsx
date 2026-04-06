import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { IconName } from "../types";
import { memo } from "react";

function TabsHeader({
  title,
  iconName,
  accessibilityLabel,
  accessibilityHint,
}: {
  title: string;
  iconName: IconName;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}) {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };
  return (
    <LinearGradient
      colors={[theme.colors.primaryLight, theme.colors.primary]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.headerTitleContainer}>
        <Ionicons
          name={iconName}
          size={28}
          color={theme.colors.surface}
          accessible={false} // Decorative
        />
        <Text
          style={styles.headerTitle}
          accessibilityRole="header"
          accessibilityLabel={title}>
          {title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Logout"
        accessibilityHint="Sign out of your account">
        <Ionicons
          name="log-out-outline"
          size={28}
          color={theme.colors.surface}
          accessible={false} // Decorative
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.medium,
    paddingTop: theme.spacing.xlarge + 20, // Status bar padding
    paddingBottom: theme.spacing.large,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...theme.shadows.medium,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: theme.colors.surface,
    marginLeft: theme.spacing.medium,
    letterSpacing: 0.5,
  },
  logoutButton: {
    padding: theme.spacing.small,
  },
});

export default memo(TabsHeader);
