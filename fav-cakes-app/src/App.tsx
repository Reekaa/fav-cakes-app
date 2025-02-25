import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
    </BrowserRouter>
  </ThemeProvider>
  )
}

export default App
