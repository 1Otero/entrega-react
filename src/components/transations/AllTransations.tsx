import { useEffect, useState } from "react"

function getLastTransation(){
  const bodyTransation= localStorage.getItem("transations")
  if(bodyTransation){
    const body= JSON.parse(bodyTransation)
    return body
  } 
  return null
}
function GetTransation({setViewTransation}:{setViewTransation:Function}){
   const[transation, setTrasation]= useState<{id: string, amount_in_cents: number, reference: string}>() 
   useEffect(() => {
    async function meTransation(){
        const body= await getLastTransation()
        console.log(body)
        setTrasation(body)
    }
    meTransation()
   }, [])
   function cerrarModal(){
    setViewTransation(false)
   }
   return (
    <>
      <div className='fixed left-0 w-full top-0 bg-gray-200 h-full p-4'> 
        <div>
          <button className="font-medium text-center w-full px-3 py-2 text-sm text-white bg-red-700 rounded-lg hover:red-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={cerrarModal}>Cerrar</button>
        </div>
        <div className="mt-14">
            {transation?<div>
                <h2>Pago exitoso</h2>
                <h3>ID transation</h3>
                <p>{transation.id}</p>
                <div>
                    <p>Referencia: {transation.reference}</p>
                    <strong>Monto: {transation.amount_in_cents}</strong>
                </div>
                <div className="mt-14">
                  <p>Puede validar su transaccion directamente al API con su ID de transaccion a la ruta: </p>
                  <div className="m-2">
                  <a target="_blank"
                  className="font-medium text-center m-2 w-full px-3 py-2 text-sm text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href={`https://entreganode.netlify.app//pago/gettransation/${transation.id}`}>Ver mi informacion transaccion</a>
                  </div>
                </div>  
            </div>:<><h2>Loading...</h2></>}
        </div>
      </div>
   </>
   )
}

export default GetTransation