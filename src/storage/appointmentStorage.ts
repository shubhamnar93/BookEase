import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment } from "../types";

const APPOINTMENTS_KEY = "appointments";

/**
 * Get all appointments
 */
export const getAppointments = async (): Promise<Appointment[]> => {
  const data = await AsyncStorage.getItem(APPOINTMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Save new appointment
 */
export const saveAppointment = async (appointment: Appointment) => {
  const appointments = await getAppointments();
  appointments.push(appointment);
  await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
};

/**
 * Delete appointment
 */
export const deleteAppointment = async (id: string) => {
  const appointments = await getAppointments();
  const updated = appointments.filter((a) => a.id !== id);
  await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
};
