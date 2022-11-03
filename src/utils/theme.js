import { createTheme } from '@mui/material';
import { primaryColor, secondaryColor } from './config';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    action: {
      active: '#0052cc',
      hover: '#0052cc',
      focus: '#0052cc',
      selected: '#0052cc',
    },
    text: {
      primary: "#111",
    },
    background: {
      default: "#fcfdfd",
      paper: "#fefefe",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    action: {
      active: '#ccc',
      hover: '#2f54d0',
      focus: '#2f54d0',
      selected: '#2f54d0',
    },
    text: {
      primary: "#ccc",
    },
    background: {
      default: "#333",
      paper: "#3a3a3a",
    },
  },
});

export {
  lightTheme,
  darkTheme,
};
