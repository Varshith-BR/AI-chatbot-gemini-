const tintColorLight = '#6B46C1'; // Deep purple primary
const tintColorDark = '#9F7AEA'; // Lighter purple for dark mode

export default {
  light: {
    text: '#1A202C',
    textSecondary: '#4A5568',
    background: '#F7FAFC',
    cardBackground: '#FFFFFF',
    inputBackground: '#EDF2F7',
    tint: tintColorLight,
    tabIconDefault: '#718096',
    tabIconSelected: tintColorLight,
    primary: '#6B46C1',
    primaryLight: '#9F7AEA',
    secondary: '#0D9488', // Teal
    accent: '#DB2777', // Pink
    success: '#10B981', // Green
    warning: '#F59E0B', // Amber
    error: '#EF4444', // Red
    errorBackground: '#FEE2E2',
    border: '#E2E8F0',
  },
  dark: {
    text: '#F7FAFC',
    textSecondary: '#A0AEC0',
    background: '#1A202C',
    cardBackground: '#2D3748',
    inputBackground: '#4A5568',
    tint: tintColorDark,
    tabIconDefault: '#A0AEC0',
    tabIconSelected: tintColorDark,
    primary: '#9F7AEA',
    primaryLight: '#B794F4',
    secondary: '#14B8A6', // Teal for dark mode
    accent: '#F472B6', // Pink for dark mode
    success: '#34D399', // Green for dark mode
    warning: '#FBBF24', // Amber for dark mode
    error: '#F87171', // Red for dark mode
    errorBackground: '#7F1D1D',
    border: '#4A5568',
  },
};