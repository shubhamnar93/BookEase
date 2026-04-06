import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppointments } from "../../src/context/AppointmentContext";
import { PROVIDERS } from "../../src/data/providers";

export default function Appointments() {
  const { getUserAppointments, cancelAppointment } = useAppointments();

  const appointments = getUserAppointments();

  if (appointments.length === 0) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.colors.primaryLight, theme.colors.primary]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="calendar" size={28} color={theme.colors.surface} />
          <Text style={styles.headerTitle}>My Appointments</Text>
        </LinearGradient>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons
              name="calendar-clear-outline"
              size={80}
              color={theme.colors.primaryLight}
            />
          </View>
          <Text style={styles.emptyText}>No appointments yet</Text>
          <Text style={styles.emptySubtext}>
            Book your first appointment to get started!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primaryLight, theme.colors.primary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Ionicons name="calendar-sharp" size={28} color={theme.colors.surface} />
        <Text style={styles.headerTitle}>My Appointments</Text>
      </LinearGradient>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const provider = PROVIDERS.find((p) => p.id === item.providerId);

          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                  <Ionicons
                    name="person"
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
                <View style={styles.headerText}>
                  <Text style={styles.providerName}>{provider?.name}</Text>
                  <Text style={styles.category}>{provider?.category}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailsContainer}>
                <View style={styles.detailCard}>
                  <Ionicons
                    name="calendar"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.detail}>{item.dateISO}</Text>
                </View>
                <View style={styles.detailCard}>
                  <Ionicons
                    name="time"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.detail}>{item.timeSlot}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => cancelAppointment(item.id)}
                style={styles.cancelButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={theme.colors.error}
                />
                <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.medium,
    paddingTop: theme.spacing.xlarge + 20, // Status bar padding
    paddingBottom: theme.spacing.large,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...theme.shadows.medium,
  },
  headerTitle: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: theme.colors.surface,
    marginLeft: theme.spacing.medium,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.large,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.large,
    ...theme.shadows.light,
  },
  emptyText: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: theme.colors.text,
    marginTop: theme.spacing.medium,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.small,
    textAlign: "center",
  },
  listContainer: {
    padding: theme.spacing.medium,
    paddingBottom: 100, // Space for bottom tab
  },
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
