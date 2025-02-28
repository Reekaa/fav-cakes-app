import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreateCake from '../pages/CreateCake';
import CakeDetail from '../pages/CakeDetail';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreateCake/>}/>
        <Route path="/cakes/:id" element={<CakeDetail/>}/>
    </Routes>
  );
};

export default AppRoutes;