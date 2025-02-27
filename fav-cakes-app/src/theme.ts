import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FAD0C5', 
    },
    secondary: {
      main: '#D1E8E2', 
    },
    background: {
      default: '#f1f1f1',
      paper: '#FFFFFF', 
    },
    text: {
      primary: '#213547', 
      secondary: '#646cff',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});

export default theme;
