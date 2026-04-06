import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppointments } from "../../src/context/AppointmentContext";
import BackButton from "@/src/components/BackButton";
import TimeSlotCard from "@/src/components/TimeSlotCard";
import BookSectionAppointment from "@/src/components/BookSectionHeader";
import DateSelector from "@/src/components/DateSelector";

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

export default function BookAppointment() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { bookAppointment, isSlotBooked } = useAppointments();

  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const selectedDateStr = date.toISOString().split("T")[0];
  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedSlot(null); // Reset slot on date change
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      Alert.alert("Error", "Please select a time slot");
      return;
    }

    const error = await bookAppointment(
      id as string,
      selectedDateStr,
      selectedSlot,
    );

    if (error) {
      Alert.alert("Booking Failed", error);
      return;
    }

    Alert.alert("Success", "Appointment booked successfully!", [
      { text: "OK", onPress: () => router.replace("/(tabs)/appointments") },
    ]);
    setSelectedSlot(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton variant="inline" />
        <Text style={styles.headerTitle}>Select Date & Time</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <BookSectionAppointment
            iconName="calendar-outline"
            title="Pick a Date"
          />
          <DateSelector
            date={date}
            handleDateChange={handleDateChange}
            selectedDateStr={selectedDateStr}
          />
        </View>

        <View style={styles.card}>
          <BookSectionAppointment
            iconName="time-outline"
            title="Available Slots"
          />
          <View style={styles.slotsGrid}>
            {TIME_SLOTS.map((slot) => {
              const booked = isSlotBooked(id as string, selectedDateStr, slot);
              const selected = selectedSlot === slot;

              return (
                <TimeSlotCard
                  key={slot}
                  slot={slot}
                  booked={booked}
                  selected={selected}
                  setSelectedSlot={setSelectedSlot}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={handleBooking}
          disabled={!selectedSlot}
          style={[
            styles.confirmButton,
            !selectedSlot && styles.confirmButtonDisabled,
          ]}
          activeOpacity={0.8}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={
              !selectedSlot ? theme.colors.textSecondary : theme.colors.surface
            }
          />
        </TouchableOpacity>
      </View>
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
    paddingTop: theme.spacing.xlarge + 20,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  content: {
    padding: theme.spacing.large,
    paddingBottom: 120, // space for fixed footer
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.large,
    marginBottom: theme.spacing.xlarge,
    ...theme.shadows.medium,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.background,
  },
  dateSelectorText: {
    fontSize: theme.fontSizes.large,
    fontWeight: "600",
    color: theme.colors.text,
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: theme.spacing.small,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.large,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.primary,
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.full,
  },
  confirmButtonDisabled: {
    backgroundColor: theme.colors.border,
  },
  confirmButtonText: {
    color: theme.colors.surface,
    fontWeight: "bold",
    fontSize: theme.fontSizes.large,
    marginRight: theme.spacing.small,
  },
});
