import CardProduct from '../cardProduct/CardProduct'
import Product from '../../../model/product/product'
import { useEffect, useState } from 'react'

const listCardProduct= new Array()
//function listProduct({sendProductCard, productCard, listProduct, setLoad, load, alertGlobal, setAlertGlobal, setListProduct}:{sendProductCard:Function, productCard:Product[], listProduct:Product[], setLoad:Function, load:Boolean, alertGlobal: {status: Boolean, message: String, type: String}, setAlertGlobal:Function, setListProduct:Function}){
function listProduct({sendProductCard, productCard, listProduct, setLoad, load, setAlertGlobal }:{sendProductCard:Function, productCard:Product[], listProduct:Product[], setLoad:Function, load:Boolean, setAlertGlobal:Function}){
    const [product, setProduct]= useState<Product>({
      _id: '',
      name: '',
      description: '',
      cantidad: 1,
      precio: 150000
    })
    // const [productRef, setProductRef]= useState<Product>({
    //   _id: '',
    //   name: '',
    //   description: '',
    //   cantidad: 1,
    //   precio: 150000
    // })

    const [count, setCount]= useState(1)
    useEffect(() => {
    console.log(product.cantidad)
    if(Number(product._id.length) > 0){
      console.log(product._id)
      console.log(!listCardProduct.find((p) => p._id === product._id))
      if(!listCardProduct.find((p) => p._id == product._id)){
        console.log(product)
        listCardProduct.push(product)
        console.log(listCardProduct)  
      }else{
       listCardProduct.forEach(p => {
        if(p._id == product._id){
          console.log(product._id)
          console.log(product.cantidad)
          p.cantidad= (p.cantidad || 0) + product.cantidad
          console.log(p.cantidad)
        }
      })
      }
      console.log(product.cantidad) 
     sendProductCard(listCardProduct)
     console.log(listCardProduct)  
     console.log(productCard)  
    }


    ///Cambia camtidad de products, resta
    console.log("restar list: ")    
    console.log(listProduct)    
    listProduct.forEach(p => {
      const cantP= p.cantidad
      const cantProduct= product.cantidad
      if(p._id == product._id){
        console.log("is equal")
        console.log(p)
        console.log(product)
        console.log(p.cantidad)
        console.log(product.cantidad)
        const restaCantidad= Number(cantP) - Number(cantProduct)
        console.log(restaCantidad)
        p.cantidad= restaCantidad
      }
    })
    console.log(listProduct)

    setProduct({
      _id: '',
      name: '',
      description: '',
      cantidad: 1,
      precio: 150000
    })
    console.log("product: fresh")
    console.log(product)


    }, [count])


    return <>
    <div className='w-4/6'>
      <div className='flex flex-wrap justify-center'>
      { listProduct.map((p) => (
        // <CardProduct key={p._id as string} setProductCard={sendProductCard} product={p}/>  
        <>
        <CardProduct key={p._id as string} setAlertGlobal={setAlertGlobal} setProduct={setProduct} product={product} productRef={p} setLoad={setLoad} productCard={productCard} load={load} count={count} setCount={setCount} />
        {/* <button onClick={tst}>lol</button> */}
        </>
      ))}
      </div>
    </div>
  </>
}

export default listProduct