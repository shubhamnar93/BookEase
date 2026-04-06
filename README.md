📱 Appointment Booking App (React Native)

A mobile application built with React Native (Expo Router) that allows users to browse service providers and book appointments with available time slots.

This project was developed as part of a technical assignment to demonstrate mobile app architecture, state management, UX thinking, and ability to ship a production-ready APK.

✨ App Overview

The app enables users to:

Register and login (offline authentication)
Browse service providers
View provider details
Book available time slots
View upcoming appointments
Cancel appointments
Persist data locally using AsyncStorage

All data is stored locally, simulating a real backend.

🧩 Features
🔐 Authentication
Register new account
Login / Logout
Persistent session restore on app restart
Local storage based (no external backend)
👩‍⚕️ Providers Listing
Browse list of service providers
View provider profile details
Navigate to booking screen
📅 Appointment Booking
Select date and time slot
Prevent double booking of the same slot
Save appointments locally
🗂️ Appointment Management
View upcoming appointments
Cancel appointment
Empty state & confirmation dialogs
🎨 UX Polish
Loading states
Success & error alerts
Clean card-based UI
Smooth navigation with Expo Router
🏗️ Tech Stack
Area Technology
Framework React Native (Expo)
Navigation Expo Router (file-based routing)
Storage AsyncStorage
State Management React Context API
Language TypeScript
Build Expo EAS (APK)
📂 Project Structure
app/
├── (auth)/
│ ├── login.tsx
│ └── register.tsx
│
├── (tabs)/
│ ├── \_layout.tsx
│ ├── providers.tsx
│ └── appointments.tsx
│
├── provider/[id].tsx
├── book/[id].tsx
└── \_layout.tsx

src/
├── context/
│ ├── AuthContext.tsx
│ └── AppointmentContext.tsx
│
├── storage/
│ ├── authStorage.ts
│ └── appointmentStorage.ts
│
├── data/providers.ts
└── types/index.ts
🧠 Architecture Decisions

1. Context API for Global State

Two global providers:

AuthContext → manages user session
AppointmentContext → manages booking logic

This keeps UI components clean and separates business logic.

2. AsyncStorage as Local Backend

A small storage layer simulates real APIs:

Users
Current session
Appointments

This demonstrates real-world persistence without requiring a backend.

3. Expo Router Navigation

File-based routing was used to:

Reduce navigation boilerplate
Improve project scalability
Mimic modern production architecture 4. Double Booking Prevention

The booking engine checks if a slot is already booked before confirming.

This simulates real booking systems and adds business logic depth.

⚠️ Assumptions
This is an offline-first demo app.
Providers and time slots are mock data.
Payments and real backend integration are out of scope.
Authentication is local and not secure for production use.
▶️ How to Run the Project
1️⃣ Install dependencies
npm install
2️⃣ Start Expo server
npx expo start
3️⃣ Run on device/emulator
Press a → Android emulator
or
Scan QR using Expo Go app
📦 Build APK (Expo EAS)
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview

Expo will generate an APK download link.

👨‍💻 Author

Shubham Narnolia
