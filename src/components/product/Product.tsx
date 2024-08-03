import { useEffect, useState } from "react"
import ListProduct from './allProducts/listProduct'
import useProduct from './allProducts/getProducts'
import Product from "../../model/product/product"

const Products= ({load, setLoad, sendProductCard, setAlertGlobal}:{load:Boolean, setLoad:Function, sendProductCard:Function, setAlertGlobal:Function}) =>{
  function ejecutar(){
    setLoad(!load)
    return
  }
  const [listProduct, setListProduct]= useState<Product[]>([])
  useEffect(() => {
    async function consigue(){{
     try{
      setLoad(true)
      const listProduct= await useProduct()
      setListProduct(listProduct)
      setLoad(!load)
     }catch(err){
       setLoad(true)
     }finally{
       setLoad(false)
     }
  }}
  consigue() 
  }, [])
    return <>
      <div>
       <div>
        <div>{load?<h2>Loading</h2>:<h2>{listProduct!=null && listProduct.length > 0?<div className="p-2"><h2><strong>List products</strong></h2></div>:<div>Not found</div>}</h2>}</div>
       </div>
       <div>
        {
          listProduct!=null && listProduct.length > 0?<ListProduct setAlertGlobal={setAlertGlobal} listProduct={listProduct} sendProductCard={sendProductCard} setLoad={setLoad} load={load} />:<h2>{load?"...":404}</h2>
        }
       </div>
       <button onClick={ejecutar}>Load</button>
      </div>
    </>
}

export default Products