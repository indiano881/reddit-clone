"use client"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
const ThemeWrapper = ({children}:{children:React.ReactNode}) => {
    return (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      );
};

export default ThemeWrapper
