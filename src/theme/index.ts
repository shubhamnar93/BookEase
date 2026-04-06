export const theme = {
  colors: {
    primary: "#4F46E5", // Premium Indigo
    primaryLight: "#818CF8",
    primaryDark: "#3730A3",
    secondary: "#10B981", // Emerald Green for success
    background: "#F8FAFC", // Slate 50 for a pristine, bright background
    surface: "#FFFFFF", // Pure white for cards
    text: "#0F172A", // Slate 900 for dark, rich text
    textSecondary: "#64748B", // Slate 500 for subtle info
    error: "#EF4444", // Red 500 for critical errors
    border: "#E2E8F0", // Soft Slate 200 border
  },
  fonts: {
    regular: "System",
    bold: "System",
  },
  fontSizes: {
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 24,
    xxlarge: 32,
  },
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  borderRadius: {
    small: 12,
    medium: 16,
    large: 24,
    full: 9999,
  },
  shadows: {
    light: {
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    medium: {
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 4,
    },
    primary: {
      shadowColor: "#4F46E5",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
      elevation: 8,
    },
  },
};
