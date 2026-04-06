# BookEase - Appointment Booking App

A React Native mobile application that allows users to book appointments with service providers. Built with Expo and TypeScript, this app provides an intuitive interface for browsing providers, scheduling appointments, and managing bookings.

## Objective

Develop a React Native mobile application that allows users to book appointments with service providers. The application should provide an easy way for users to view available time slots and schedule appointments.

## Key Features

### User Registration and Authentication

- User registration with email and password
- login/logout functionality
- Persistent authentication using local storage
- Session restoration on app restart

### Service Provider Listing

- View provider details including name, profile image, and category
- Search and filter providers
- Detailed provider profiles with descriptions

### Appointment Scheduling

- Interactive date and time slot selection
- Real-time availability checking
- Prevent double-booking of time slots

### Appointment Management

- View all upcoming appointments in a dedicated tab
- Cancel appointments with confirmation
- Empty states for better user experience

## Technical Requirements

- **Framework**: React Native with Expo
- **Language**: TypeScript for type safety
- **Navigation**: Expo Router (file-based routing)
- **Storage**: AsyncStorage for local data persistence
- **State Management**: React Context API
- **UI Components**: Custom components with Expo Vector Icons
- **Platform**: Android (tested on various devices)

## Installation and Setup

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Android SDK with emulator or physical device

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd BookEase
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on Android**
   ```bash
   npm run android
   ```

## Usage

1. **Registration/Login**: Create an account or login with existing credentials
2. **Browse Providers**: Explore available service providers in the Providers tab
3. **Book Appointment**: Select a provider, choose date and time, confirm booking
4. **Manage Appointments**: View and cancel upcoming appointments in the Appointments tab

## 🛠️ Build and Deployment

### Building APK for Testing

1. **Configure for production**

   ```bash
   expo build:android
   ```

2. **Download APK**: Follow the Expo build process to download the APK file

The APK file is included in the submission for testing purposes.

## Project Structure

```
BookEase/
├── app/                    # Expo Router app directory
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Tab navigation
│   └── book/              # Booking screens
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React contexts for state management
│   ├── data/              # Mock data and constants
│   ├── storage/           # AsyncStorage utilities
│   ├── theme/             # App theming
│   └── types/             # TypeScript type definitions
├── android/               # Android build configuration
├── package.json
├── app.json              # Expo configuration
└── tsconfig.json         # TypeScript configuration
```

## Dependencies and Libraries

### Core Dependencies

- **React Native**: `0.81.5` - Mobile framework
- **Expo**: `~54.0.33` - Development platform
- **Expo Router**: `~6.0.23` - File-based routing
- **TypeScript**: `~5.9.2` - Type safety

### Storage and State

- **@react-native-async-storage/async-storage**: `2.2.0` - Local storage
- **React Context API** - State management

### UI and Navigation

- **@expo/vector-icons**: `^15.0.3` - Icon library
- **@react-navigation/native**: `^7.1.8` - Navigation framework
- **expo-linear-gradient**: `~15.0.8` - Gradient backgrounds

### Utilities

- **@react-native-community/datetimepicker**: `8.4.4` - Date/time picker
- **expo-haptics**: `~15.0.8` - Haptic feedback
- **react-native-reanimated**: `~4.1.1` - Animations

## Assumptions and Design Decisions

1. **Offline-First**: All data is stored locally using AsyncStorage, simulating backend functionality
2. **Mock Data**: Service providers and initial data are hardcoded for demonstration
3. **Authentication**: Simple email/password validation without encryption (for demo purposes)
4. **Time Slots**: Fixed 1-hour slots from 9 AM to 5 PM, Monday to Friday
5. **No Backend**: No external API integration; all operations are local
6. **Single Platform**: Focused on Android development as specified

## 🔧 Development Tools

- **Expo CLI**: Development and build tooling
- **ESLint**: Code linting with Expo configuration
- **TypeScript**: Static type checking
- **Android Studio**: Android development environment

## Screenshots

_(Screenshots would be included here showing:)_

- Login/Register screens
- Provider listing
- Provider details
- Date/time selection
- Appointment booking confirmation
- Appointments list

## Future Enhancements

- Backend API integration
- Push notifications for appointments
- Provider ratings and reviews
- Payment integration
- iOS support
- Real-time availability updates

## License

This project is developed as part of a technical assignment and is not intended for commercial use.

---

**Note**: This application was developed within the specified timeframe and demonstrates clean code architecture, user experience design, and React Native best practices.
