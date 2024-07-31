//import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import Pago from './components/pago/Pago.tsx'
import { Routes, Route } from 'react-router-dom'
import Products from './components/product/Product.tsx'
import Load from './components/utils/load/load.tsx'
import Head from "./components/utils/head/head.tsx"

function App() {
  const [loading, setLoad]= useState(false)
  useEffect(() => {
    console.log("change")
  }, [loading])
  return (
    <>
      <Head />
      <Load loading={loading} setLoad={setLoad}/>
      <Routes>
        <Route path='/payment' element={<Pago />}/>
        <Route path='/listProducts' element={<Products setLoad={setLoad} load={loading}/>} />
      </Routes>
    </>
  )
}

export default App
