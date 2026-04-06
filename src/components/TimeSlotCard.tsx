import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export default function TimeSlotCard({
  slot,
  booked,
  selected,
  setSelectedSlot,
}: {
  slot: string;
  booked: boolean;
  selected: boolean;
  setSelectedSlot: (slot: string) => void;
}) {
  const handlePress = () => {
    setSelectedSlot(slot);
  };
  return (
    <TouchableOpacity
      key={slot}
      disabled={booked}
      onPress={handlePress}
      style={[
        styles.slotButton,
        booked && styles.slotButtonDisabled,
        selected && styles.slotButtonSelected,
      ]}
      activeOpacity={0.7}>
      <Text
        style={[
          styles.slotText,
          selected && styles.slotTextSelected,
          booked && styles.slotTextDisabled,
        ]}>
        {slot}
      </Text>
      {booked && (
        <Ionicons
          name="lock-closed"
          size={14}
          color={theme.colors.textSecondary}
          style={{ marginLeft: 6 }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  slotButton: {
    width: "48%",
    flexDirection: "row",
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1.5,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  slotButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primaryDark,
    ...theme.shadows.light,
  },
  slotButtonDisabled: {
    backgroundColor: theme.colors.border,
    opacity: 0.5,
  },
  slotText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    fontWeight: "600",
  },
  slotTextSelected: {
    color: theme.colors.surface,
    fontWeight: "bold",
  },
  slotTextDisabled: {
    color: theme.colors.textSecondary,
  },
});
