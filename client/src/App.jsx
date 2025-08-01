import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { Routes,Route } from 'react-router-dom'
import PreChat from './pages/PreChat'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/pre-chat' element={<PreChat/>}/>
      </Routes>
    </>
  )
}

export default App
