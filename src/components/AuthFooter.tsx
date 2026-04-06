import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

export const AuthFooter = ({
  text,
  linkText,
  onPress,
}: {
  text: string;
  linkText: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.link}>{text} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.linkBold}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
