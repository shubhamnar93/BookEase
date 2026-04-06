import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { useAppointments } from "../context/AppointmentContext";
import { Appointment, Provider } from "../types";
import { memo } from "react";

function AppointmentCard({
  item,
  provider,
}: {
  item: Appointment;
  provider: Provider | undefined;
}) {
  const { cancelAppointment } = useAppointments();
  const handleCancel = () => cancelAppointment(item.id);
  const formattedDate = item.dateISO;
  const providerName = provider?.name ?? "Unknown Provider";
  const providerCategory = provider?.category ?? "Service";
  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel={`${providerName} appointment`}
      accessibilityHint={`${formattedDate} at ${item.timeSlot}`}>
      <View style={styles.cardHeader} accessible={false}>
        <View style={styles.avatarContainer}>
          <Ionicons
            name="person"
            size={24}
            color={theme.colors.primary}
            accessible={false} // Decorative
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.providerName}>{providerName}</Text>
          <Text style={styles.category}>{providerCategory}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsContainer}>
        <View
          style={styles.detailCard}
          accessible={true}
          accessibilityLabel={`Date: ${formattedDate}`}
          accessibilityRole="none">
          <Ionicons
            name="calendar"
            size={20}
            color={theme.colors.primary}
            accessible={false}
          />
          <Text style={styles.detail}>{formattedDate}</Text>
        </View>
        <View
          style={styles.detailCard}
          accessible={true}
          accessibilityLabel={`Time: ${item.timeSlot}`}
          accessibilityRole="none">
          <Ionicons
            name="time"
            size={20}
            color={theme.colors.primary}
            accessible={false}
          />
          <Text style={styles.detail}>{item.timeSlot}</Text>
        </View>
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Cancel appointment"
        accessibilityHint={`Cancels the appointment with ${providerName}`}
        onPress={handleCancel}
        style={styles.cancelButton}
        activeOpacity={0.7}>
        <Ionicons
          name="close-circle"
          size={18}
          color={theme.colors.error}
          accessible={false}
        />
        <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.large,
    marginBottom: theme.spacing.large,
    ...theme.shadows.medium,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.medium,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryLight + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    marginLeft: theme.spacing.medium,
    flex: 1,
  },
  providerName: {
    fontSize: theme.fontSizes.large,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  category: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.tiny,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.medium,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.large,
  },
  detailCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    width: "48%",
  },
  detail: {
    fontSize: theme.fontSizes.medium,
    fontWeight: "600",
    color: theme.colors.text,
    marginLeft: theme.spacing.small,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.error + "10", // 10% opacity
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.error + "30",
  },
  cancelButtonText: {
    color: theme.colors.error,
    fontWeight: "bold",
    fontSize: theme.fontSizes.medium,
    marginLeft: theme.spacing.small,
  },
});

export default memo(AppointmentCard);
