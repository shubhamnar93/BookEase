import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import { IconName } from "../types";
import { memo } from "react";

function AuthHeader({
  heading,
  iconName,
  tagline,
}: {
  heading: string;
  iconName: IconName;
  tagline: string;
}) {
  return (
    <LinearGradient
      colors={[theme.colors.primaryLight, theme.colors.primary]}
      style={styles.heroBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Ionicons
            name={iconName}
            size={56}
            color={theme.colors.primary}
            accessible={false} // Decorative icon
          />
        </View>
        <Text
          style={styles.appName}
          accessibilityRole="header"
          accessibilityLabel={heading}>
          {heading}
        </Text>
        <Text
          style={styles.tagline}
          accessible={false} // Secondary text, optional
        >
          {tagline}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  heroBackground: {
    paddingTop: 80,
    paddingBottom: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    ...theme.shadows.primary,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoWrapper: {
    width: 90,
    height: 90,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.medium,
    ...theme.shadows.medium,
  },
  appName: {
    fontSize: theme.fontSizes.xxlarge,
    fontWeight: "800",
    color: theme.colors.surface,
    marginBottom: theme.spacing.tiny,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: theme.fontSizes.medium,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
});

export default memo(AuthHeader);
