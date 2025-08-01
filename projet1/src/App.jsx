import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComposant from './component/headerNav';
import Accueil from './page/accueilPage';
import Boutique from './page/boutiquePage';
import Footer from './component/footerComponent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <HeaderComposant />
      
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/boutique" element={<Boutique />} />
        </Routes>

        <Footer />
      </BrowserRouter>
  )
}

export default App
