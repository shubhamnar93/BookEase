import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { memo, useState } from "react";
import { theme } from "../theme";

function DateSelector({
  date,
  handleDateChange,
  selectedDateStr,
}: {
  date: Date;
  handleDateChange: (event: DateTimePickerEvent, date?: Date) => void;
  selectedDateStr: string;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const openPicker = () => setShowPicker(true);
  const closePicker = () => setShowPicker(false);

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const eventType = event.type?.toLowerCase?.();

    if (eventType === "dismissed") {
      closePicker();
      return;
    }

    if (eventType === "set" && date) {
      closePicker();
      handleDateChange(event, date);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.dateSelector}
        onPress={openPicker}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Select date"
        accessibilityHint={`Current date: ${selectedDateStr}. Tap to open calendar`}>
        <Text style={styles.dateSelectorText}>{selectedDateStr}</Text>
        <Ionicons
          name="calendar"
          size={20}
          color={theme.colors.textSecondary}
          accessible={false} // Decorative
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={onChange}
          accessible={true}
          accessibilityLabel="Date picker modal"
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
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
});

export default memo(DateSelector);
