import React, { useEffect } from "react"
import Pago from "../pago/Pago"
import useProduct from './allProducts/getProducts'

const Product= ({load, setLoad}) =>{
    function ejecutar(){
        setLoad(!load)
        console.log(load)
        return
    }
    //await useProduct()
    return <>
      <div>
       <div>
        <h2>{load}</h2>
        <p>Product...</p>
       </div>
       <button onClick={ejecutar}>Load</button>
      </div>
      <Pago namee={"refff"}/>
    </>
}

export default Product