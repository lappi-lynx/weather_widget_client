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
  const searchParams = new URLSearchParams(location.search);
  const getThemeMode = (themeParam: string | null) => themeParam === Themes.Light ? Themes.Light : Themes.Dark;
  const mode: PaletteMode = getThemeMode(searchParams.get('theme'));

  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode,
      ...(mode === Themes.Light ? {
        background: {
          default: '#EEEEEE',
          paper: '#EEEEEE',
          box: '#b0bec5',
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
        icon: {
          sun: '#d84315',
          rain: '#0277bd',
          cloud: '#757575',
          snow: '#fff',
        },
      } : {
        background: {
          default: '#31363F',
          paper: '#31363F',
          box: '#607d8b',
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
        icon: {
          sun: '#ffa000',
          rain: '#00bcd4',
          cloud: '#9e9e9e',
          snow: '#e0e0e0',
        },
      })
    },
  }), [mode]);

  return (
    <MUIThemeProvider theme={theme}>
        {children}
    </MUIThemeProvider>
  );
};
