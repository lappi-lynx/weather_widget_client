import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { createTheme, PaletteMode } from "@mui/material";

enum Themes {
  Dark = 'dark',
  Light = 'light'
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const getThemeMode = (themeParam: string | null) => themeParam === Themes.Light ? Themes.Light : Themes.Dark;
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
        chart: {
          tempterature: '#e15759',
          precipitation: '#76b7b2',
          wind: '#ff7f00',
          clouds: '#4e79a7'
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
        chart: {
          tempterature: '#e15759',
          precipitation: '#4e79a7',
          wind: '#edc949',
          clouds: '#76b7b2'
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
