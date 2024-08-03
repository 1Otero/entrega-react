import CardProduct from '../cardProduct/CardProduct'
import Product from '../../../model/product/product'
import { useEffect, useState } from 'react'

const listCardProduct= new Array()
//function listProduct({sendProductCard, productCard, listProduct, setLoad, load, alertGlobal, setAlertGlobal, setListProduct}:{sendProductCard:Function, productCard:Product[], listProduct:Product[], setLoad:Function, load:Boolean, alertGlobal: {status: Boolean, message: String, type: String}, setAlertGlobal:Function, setListProduct:Function}){
function listProduct({sendProductCard, listProduct, setLoad, load, setAlertGlobal }:{sendProductCard:Function, listProduct:Product[], setLoad:Function, load:Boolean, setAlertGlobal:Function}){
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
    if(Number(product._id.length) > 0){
      if(!listCardProduct.find((p) => p._id == product._id)){
        listCardProduct.push(product)
      }else{
       listCardProduct.forEach(p => {
        if(p._id == product._id){
          p.cantidad= (p.cantidad || 0) + product.cantidad
        }
      })
      }
     sendProductCard(listCardProduct)
    }

    ///Cambia camtidad de products, resta
    listProduct.forEach(p => {
      const cantP= p.cantidad
      const cantProduct= product.cantidad
      if(p._id == product._id){
        const restaCantidad= Number(cantP) - Number(cantProduct)
        p.cantidad= restaCantidad
      }
    })

    setProduct({
      _id: '',
      name: '',
      description: '',
      cantidad: 1,
      precio: 150000
    })

    }, [count])


    return <>
    <div className='w-4/6'>
      <div className='flex flex-wrap justify-center'>
      { listProduct.map((p) => (
        <>
        <CardProduct key={p._id as string} setAlertGlobal={setAlertGlobal} setProduct={setProduct} product={product} productRef={p} setLoad={setLoad} load={load} count={count} setCount={setCount} />
        {/* <button onClick={tst}>lol</button> */}
        </>
      ))}
      </div>
    </div>
  </>
}

export default listProduct