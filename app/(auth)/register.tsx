import { useAuth } from "@/src/context/AuthContext";
import { theme } from "@/src/theme";
import { useRouter } from "expo-router";
import { memo, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getUsers, saveUser } from "../../src/storage/authStorage";
import AuthHeader from "@/src/components/AuthHeader";
import Input from "@/src/components/input";
import Button from "@/src/components/Button";
import AuthFooter from "@/src/components/AuthFooter";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    await saveUser({ email, password });
    console.log(await getUsers());
    Alert.alert("Success", "Account created!");
    const error = await login(email, password);
    if (error) {
      Alert.alert("Login Failed", error);
      return;
    }
    router.push("/(tabs)/providers");
  };

  const handleLoginPush = () => {
    router.replace("/(auth)/login");
  };

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
          heading="Join BookEase"
          tagline="Create an account to get started."
          iconName="person-add"
        />
        <View style={styles.formContainer}>
          <Text
            style={styles.formTitle}
            accessibilityRole="header"
            accessibilityLabel="Sign Up Form">
            Sign Up
          </Text>
          <Text style={styles.formSubtitle}>Enter your details below</Text>
          <Input
            name={name}
            setName={setName}
            iconName="person-outline"
            placeholder="Full Name"
            accessibilityLabel="Full name input"
            accessibilityHint="Enter your full name"
          />
          <Input
            name={email}
            setName={setEmail}
            iconName="mail-outline"
            placeholder="Email"
            accessibilityLabel="Email address input"
            accessibilityHint="Enter a valid email address"
          />
          <Input
            name={password}
            setName={setPassword}
            iconName="lock-closed-outline"
            placeholder="Password"
            accessibilityLabel="Password input"
            accessibilityHint="Enter a secure password, text is hidden"
            secureTextEntry={true}
          />
          <Button
            label="Create Account"
            iconName="arrow-forward"
            onPress={handleSignup}
            accessibilityLabel="Create new account"
            accessibilityHint="Registers your account and signs you in"
          />

          <AuthFooter
            text="Already have an account? "
            linkText="Sign In"
            onPress={handleLoginPush}
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

export default memo(Signup);
