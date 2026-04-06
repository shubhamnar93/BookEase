import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function Login() {
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/providers");
    }
  }, [user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const error = await login(email, password);

    if (error) {
      console.log(error);
      Alert.alert("Login Failed", error);
      return;
    }

    router.push("/(tabs)/providers");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={[theme.colors.primaryLight, theme.colors.primary]}
          style={styles.heroBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Ionicons name="calendar" size={56} color={theme.colors.primary} />
            </View>
            <Text style={styles.appName}>BookEase</Text>
            <Text style={styles.tagline}>Book appointments instantly.</Text>
          </View>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Welcome Back</Text>
          <Text style={styles.formSubtitle}>Sign in to continue</Text>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
            <Ionicons name="arrow-forward" size={20} color={theme.colors.surface} />
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.link}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.linkBold}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xlarge,
  },
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
  formContainer: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.large,
    marginTop: -30,
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.large,
    ...theme.shadows.medium,
  },
  formTitle: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.tiny,
  },
  formSubtitle: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.large,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
  },
  inputIcon: {
    marginRight: theme.spacing.small,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.medium,
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing.medium,
    ...theme.shadows.primary,
  },
  buttonText: {
    color: theme.colors.surface,
    fontWeight: "bold",
    fontSize: theme.fontSizes.large,
    marginRight: theme.spacing.small,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.xlarge,
  },
  link: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.medium,
  },
  linkBold: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.medium,
    fontWeight: "bold",
  },
});
