import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import './App.css'
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes /> 
    </BrowserRouter>
  </ThemeProvider>
  )
}

export default App
