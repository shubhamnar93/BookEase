import { AppointmentProvider } from "@/src/context/AppointmentContext";
import { theme } from "@/src/theme";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

function RootNavigator() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (
      user &&
      segments[0] !== "(tabs)" &&
      segments[0] !== "provider" &&
      segments[0] !== "book"
    ) {
      router.replace("/(tabs)/providers");
    }
  }, [user, isLoading, segments]);

  // Show loading spinner while checking session
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}>
        <ActivityIndicator 
          size="large" 
          color={theme.colors.primary}
          accessibilityLabel="Loading application"
          accessibilityRole="progressbar"
          accessibilityLiveRegion="polite"
        />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <RootNavigator />
      </AppointmentProvider>
    </AuthProvider>
  );
}
