import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { createTheme, PaletteMode } from "@mui/material";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const getThemeMode = (themeParam: string | null) => themeParam === 'light' ? 'light' : 'dark';
  const mode: PaletteMode = getThemeMode(searchParams.get('theme'));
  const themeInit = (mode: PaletteMode) => createTheme({
    palette: {
      mode: mode,
      ...(mode === 'light' ? {
        background: {
          default: '#EEEEEE',
          paper: '#EEEEEE',
        },
        text: {
          primary: '#31363F',
          secondary: 'rgba(49, 54, 63, 0.7)',
        },
      } : {
        background: {
          default: '#31363F',
          paper: '#31363F',
        },
        text: {
          primary: '#EEEEEE',
          secondary: 'rgba(255, 255, 255, 0.7)',
        },
      })
    },
  });

  return (
    <MUIThemeProvider theme={themeInit(mode)}>
        {children}
    </MUIThemeProvider>
  );
};
