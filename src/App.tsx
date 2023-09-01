import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'  
import {  About, Home, NavBar, Store } from './components/pages'
import { ShoppingCartProvider } from './components/context/CartContext'

function App() { 
  return (
    <ShoppingCartProvider>
    <NavBar/>
    <Container className='mb-4'>
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/store" element={<Store />}/>
     </Routes>
    </Container>
    </ShoppingCartProvider>
  )
}

export default App
