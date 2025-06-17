import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ColorSchemeType = 'light' | 'dark';

interface ColorSchemeContextType {
  colorScheme: ColorSchemeType;
  setColorScheme: (scheme: ColorSchemeType) => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextType>({
  colorScheme: 'light',
  setColorScheme: () => {},
});

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme() as ColorSchemeType;
  const [colorScheme, setColorScheme] = useState<ColorSchemeType>(deviceColorScheme || 'light');

  // Initialize with device preference
  useEffect(() => {
    if (deviceColorScheme) {
      setColorScheme(deviceColorScheme);
    }
  }, [deviceColorScheme]);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorSchemeContext() {
  return useContext(ColorSchemeContext);
}