import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppointments } from "../../src/context/AppointmentContext";
import { PROVIDERS } from "../../src/data/providers";
import TabsHeader from "@/src/components/TabsHeader";
import AppointmentCard from "@/src/components/AppointmentCard";

export default function Appointments() {
  const { getUserAppointments } = useAppointments();
  const appointments = getUserAppointments();

  if (appointments.length === 0) {
    return (
      <View style={styles.container}>
        <TabsHeader title="My Appointments" iconName={"calendar-sharp"} />
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
      <TabsHeader title="My Appointments" iconName={"calendar-sharp"} />
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const provider = PROVIDERS.find((p) => p.id === item.providerId);

          return <AppointmentCard item={item} provider={provider} />;
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
});
