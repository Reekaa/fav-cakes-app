import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFADAD",
    },
    secondary: {
      main: "#D1E8E2",
    },
    background: {
      default: "#FAE5D3",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#3E2723",
      secondary: "#646cff",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
});

export default theme;
