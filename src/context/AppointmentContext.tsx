import React, { createContext, useContext, useEffect, useState } from "react";
import {
  deleteAppointment,
  getAppointments,
  saveAppointment,
} from "../storage/appointmentStorage";
import { Appointment } from "../types";
import { useAuth } from "./AuthContext";

type AppointmentContextType = {
  appointments: Appointment[];
  bookAppointment: (
    providerId: string,
    dateISO: string,
    timeSlot: string,
  ) => Promise<string | null>;
  cancelAppointment: (id: string) => Promise<void>;
  getUserAppointments: () => Appointment[];
  isSlotBooked: (
    providerId: string,
    dateISO: string,
    timeSlot: string,
  ) => boolean;
};

const AppointmentContext = createContext<AppointmentContextType>(
  {} as AppointmentContextType,
);

export const useAppointments = () => useContext(AppointmentContext);
export const AppointmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data);
  };
  const isSlotBooked = (
    providerId: string,
    dateISO: string,
    timeSlot: string,
  ) => {
    return appointments.some(
      (a) =>
        a.providerId === providerId &&
        a.dateISO === dateISO &&
        a.timeSlot === timeSlot,
    );
  };
  const bookAppointment = async (
    providerId: string,
    dateISO: string,
    timeSlot: string,
  ) => {
    if (!user) return "User not logged in";

    if (isSlotBooked(providerId, dateISO, timeSlot)) {
      return "This time slot is already booked";
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      userEmail: user,
      providerId,
      dateISO,
      timeSlot,
      createdAt: new Date().toISOString(),
    };

    await saveAppointment(newAppointment);
    setAppointments((prev) => [...prev, newAppointment]);

    return null;
  };
  const cancelAppointment = async (id: string) => {
    await deleteAppointment(id);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };
  const getUserAppointments = () => {
    return appointments.filter((a) => a.userEmail === user);
  };
  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        bookAppointment,
        cancelAppointment,
        getUserAppointments,
        isSlotBooked,
      }}>
      {children}
    </AppointmentContext.Provider>
  );
};
