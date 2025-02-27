import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import './App.css'
import Home from './pages/Home'
import CreateCake from './pages/CreateCake'
import CakeDetail from './pages/CakeDetail'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/create" element={<CreateCake/>}/>
                <Route path="/cakes/:id" element={<CakeDetail/>}/>
              </Routes>
    </BrowserRouter>
  </ThemeProvider>
  )
}

export default App
