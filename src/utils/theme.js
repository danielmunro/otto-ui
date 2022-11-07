import { createTheme } from '@mui/material';
import { primaryColor, secondaryColor } from './config';

const shared = {
  typography: {
    h1: {
      fontSize: "50pt",
      paddingBottom: 10,
    },
    h2: {
      fontSize: "36pt",
      padding: "40px 0 20px 0",
    },
    fontSize: 16,
    body1: {
      lineHeight: 1.6,
    },
  },
};

const lightTheme = createTheme({
  ...shared,
  ...{
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
        default: "#dfdfdf",
        paper: "#fafafa",
      },
    },
  },
});

const darkTheme = createTheme({
  ...shared,
  ...{
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
  }
});

export {
  lightTheme,
  darkTheme,
};
