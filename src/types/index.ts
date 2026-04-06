// USER of the app
export type User = {
  email: string;
  password: string;
};

// SERVICE PROVIDER
export type Provider = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
};

// APPOINTMENT booking
export type Appointment = {
  id: string;
  userEmail: string;
  providerId: string;
  dateISO: string; // "2026-04-06"
  timeSlot: string; // "10:00 AM"
  createdAt: string;
};
