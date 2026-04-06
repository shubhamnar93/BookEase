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
import Button from "@/src/components/Button";
import BookCard from "@/src/components/BookCard";

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
        <BookCard iconName="calendar-outline" title="Pick a Date">
          <DateSelector
            date={date}
            handleDateChange={handleDateChange}
            selectedDateStr={selectedDateStr}
          />
        </BookCard>

        <BookCard iconName="time-outline" title="Available Slots">
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
        </BookCard>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Button
          label="confirm Booking"
          iconName="checkmark-circle"
          onPress={handleBooking}
          disabled={!selectedSlot}
          size={24}
          padding="large"
        />
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
});
