import { useState } from "react"
import Pago from "../pago/Pago"
import Product from "./../../model/product/product"

function card({cardProduct, setLoad, setAlertGlobal, setShowCart, setProductCard}:{cardProduct: Product[], setLoad:Function, setAlertGlobal:Function, setShowCart:Function, setProductCard:Function}){
  const [infoTarjeta, setInfoTarjeta]= useState<{toktarjeta: String, acceptConfirm: String}>(Object)
  const [ver, setVer]= useState(false)
  function comprar(){
    setVer(!ver)
  }
  return <>
    <div className="h-56 overflow-y-auto">
    <div className="flex flex-wrap justify-center">
    {cardProduct.length>0 ? cardProduct.map((pr:any) => {
       //const pr= p?.product
       return (
        <div>
          <div>
            
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <strong>{pr.name}</strong>
                </div>
                <div className="flex flex-wrap justify-center">
                  <img className="p-1 rounded-t-lg h-28" src="/pending.png" alt="product image" />
                </div>
                <div>
                  <h2>{pr.description}</h2>
                  <p>{`${pr?.cantidad}`}</p>   
                </div>
            </div>

          </div>
        </div>
    )
    }):<h2>Waiting for products to buy</h2>}
    </div>
    </div>
    {ver?<p>
        <Pago infoTarjeta={infoTarjeta} setInfoTarjeta={setInfoTarjeta} infoCarrito={cardProduct} setLoad={setLoad} setAlertGlobal={setAlertGlobal} setShowCart={setShowCart} setProductCard={setProductCard}/>
    </p>:<div></div>}
    {cardProduct.length>0?<button className="m-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={comprar}>{ !ver ? <p>Validar compra</p> : <p>Ocultar compra</p> }</button>:<div></div>} 
    {/* <button onClick={finalizarPago}>Pagar</button> */}
  </>
}

export default card