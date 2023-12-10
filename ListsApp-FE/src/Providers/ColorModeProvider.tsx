import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

interface ColorModeContextType {
    colorMode: string;
    setColorMode: React.Dispatch<React.SetStateAction<string>>;
  }

const ColorModeContext = createContext<ColorModeContextType>({
    colorMode: 'light',
    setColorMode: () => {},
  });

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider:React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [colorMode, setColorMode] = useState('light');

  useEffect(() => {
    const storedMode = localStorage.getItem('colorMode');
    if (storedMode) {
      setColorMode(storedMode);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (colorMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};