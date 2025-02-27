import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import './App.css'
import Home from './pages/Home'
import CreateCake from './pages/CreateCake'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateCake />} />
              </Routes>
    </BrowserRouter>
  </ThemeProvider>
  )
}

export default App
