import { theme } from "@/src/theme";
import { useRouter } from "expo-router";
import { memo, useCallback, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import AuthHeader from "@/src/components/AuthHeader";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import AuthFooter from "@/src/components/AuthFooter";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    const error = await login(email, password);
    if (error) {
      console.log(error);
      Alert.alert("Login Failed", error);
      return;
    }
    router.push("/(tabs)/providers");
  };

  const handleRegisterPush = useCallback(() => {
    router.push("/register");
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/providers");
    }
  }, [user]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <AuthHeader
          heading="BookEase"
          tagline="Book appointments instantly."
          iconName="calendar"
        />

        <View style={styles.formContainer}>
          <Text
            style={styles.formTitle}
            accessibilityRole="header"
            accessibilityLabel="Login Form">
            Welcome Back
          </Text>
          <Text style={styles.formSubtitle}>Sign in to continue</Text>
          <Input
            name={email}
            setName={setEmail}
            iconName="mail-outline"
            placeholder="Email"
            accessibilityLabel="Email address input"
            accessibilityHint="Enter your registered email address"
          />
          <Input
            name={password}
            setName={setPassword}
            iconName="lock-closed-outline"
            placeholder="Password"
            accessibilityLabel="Password input"
            accessibilityHint="Enter your password, text is hidden for security"
            secureTextEntry={true}
          />
          <Button
            label="Sign In"
            iconName="arrow-forward"
            onPress={handleLogin}
            marginTop
            accessibilityLabel="Sign in to your account"
            accessibilityHint="Submits your email and password"
          />

          <AuthFooter
            text="Don't have an account? "
            linkText="Create an account"
            onPress={handleRegisterPush}
          />
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
});

export default memo(Login);
