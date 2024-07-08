import React from 'react'
import './index.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Home from './pages/home/Home'
import Coin from './pages/coin/Coin'
import Footer from './components/navbar/footer/footer'
const App = () => {
  return (
    <div className="app">
     <Navbar />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/coins/:coinId' element={<Coin />} />
     </Routes>
     <Footer />
    </div>
  )
}

export default App