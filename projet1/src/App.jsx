import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComposant from './component/headerNav';
import Accueil from './page/accueilPage';
import Boutique from './page/boutiquePage';
import Footer from './component/footerComponent';
import Login from './page/loginPage';
import Register from './page/registerPage';
import Users from './page/usersPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <HeaderComposant />
      
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/users' element={<Users />} />
        </Routes>

      </BrowserRouter>
  )
}

export default App
