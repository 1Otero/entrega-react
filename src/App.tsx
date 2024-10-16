//import React from 'react'
import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Products from './components/product/Product.tsx'
import Load from './components/utils/load/load.tsx'
import Head from "./components/utils/head/head.tsx"
import Card from "./components/card/card.tsx"
import Product from './model/product/product.tsx'
import AlertGlobal from './components/utils/alert/alert.tsx'
import AllTransation from './components/transations/AllTransations.tsx'

function App() {
  const [loading, setLoad]= useState(false)
  const [isPago, setIsPago]= useState(false)
  const [showCart, setShowCart]= useState(false)
  const [productCard, setProductCard]= useState<Product[]>([])
  const [alertGlobal, setAlertGlobal]= useState<{status: Boolean, message: String, type: String}>({status: false, message: '', type: ''})
  const [viewTransation, setViewTransation]= useState(false)
  
  return (
    <>
      <div className='w-5/6'>
      <div className='mb-1'>
       <Head />
      </div>
      <button onClick={() => setShowCart(!showCart)} className={`${!showCart?"bg-green-400":"bg-red-500"} p-2`}>
       <div className='font-semibold text-white'>{showCart?<div><p className='w-2/3'>Hide cart</p><div className='flex'><img className='w-2/3' src='/ocultarobajar.svg'/></div></div>:<div><p>View cart</p><div className='flex'><img rel="stylesheet" src="/cart.svg"/>{productCard.length}</div></div>}</div>
      </button>
      <div className='w-full top-4 fixed left-0 h-12 bg-transparent float-right z-30'>
       <AlertGlobal infoAlert={alertGlobal} setAlertGlobal={setAlertGlobal} />
      </div>
      {
        showCart?<div className='bg-gray-300 p-5 m-2'>
        <Card setViewTransation={setViewTransation} isPago={isPago} setIsPago={setIsPago} cardProduct={productCard} setLoad={setLoad} setAlertGlobal={setAlertGlobal} setShowCart={setShowCart} setProductCard={setProductCard}/> 
       </div>:<div></div>
      }
      <div>{viewTransation?<div><AllTransation setViewTransation={setViewTransation} /></div>:<></>}</div>
      {/* <Card cardProduct={listProductCard} /> */}
      <div>
       { loading? <Load loading={loading}/> : <div></div> }
      </div>
      <Routes>
        {/* <Route path='/payment' element={<Pago />}/> */}
        <Route path='/' element={<Products setIsPago={setIsPago} isPago={isPago} setAlertGlobal={setAlertGlobal} sendProductCard={setProductCard} setLoad={setLoad} load={loading} />} />
      </Routes>
      </div>
    </>
  )
}

export default App
