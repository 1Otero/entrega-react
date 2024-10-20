import Product from "../../../model/product/product";

function cardProduct({product, setProduct, setCount, count, setAlertGlobal, productRef}:{product:Product, setProduct:Function, setLoad:Function, load:Boolean, setCount:Function, count:number, setAlertGlobal:Function, productRef:Product}){
    function add(){
      const cantidadRef= Number(productRef.cantidad)
      const cantidadProduct= Number(product.cantidad)
      if(cantidadRef < 0 || cantidadProduct > cantidadRef){
        setAlertGlobal({status: true, message: `Supero la cantidad existente de productos no se pudo agregar al carrito`, type: 'red'})
        return
      }
      if(cantidadProduct < 1){
        console.log("error")
        setAlertGlobal({status: true, message: `La cantidad seleccionada debe ser superior a 0`, type: 'red'})   
        return
      }
      product._id= productRef._id
      product.name= productRef.name
      product.precio= productRef.precio
      product.description= productRef.description
      setProduct(product)
      // sendProductCard2({...productCard2, [`${_id}`]:product})
      //sendProductCard2((prev:Record<string, Object>) => ({...productCard2, [`${_id}`]:{ ... prev[`${_id}`], cantidad: (prev[`${_id}`].cantidad || 0) +  }}))
      // sendProductCard2((prev:Record<string, Object>) => ({...productCard2, [`${_id}`]:{ ... prev[`${_id}`], cantidad: +product.cantidad }}))
      setCount(((count || 0) + 1))
      setAlertGlobal({status: true, message: `Se agrego ${product?.name} correctamente al carrito`, type: 'green'}) 
      const dor:any= document.getElementById(productRef._id as string)
      dor.value= 1
      
    }
    function changeInputValue(e:React.ChangeEvent<HTMLInputElement>){
        console.log(Number(product.cantidad) < Number(productRef.cantidad))
        product._id= productRef._id
        product.name= productRef.name
        product.description= productRef.description
        product.precio= productRef.precio
        let cantidadProduct= Number(e.target.value)
        console.log(cantidadProduct)
        product.cantidad= cantidadProduct
        if(Number(productRef.cantidad) < 0 || cantidadProduct > Number(productRef.cantidad)){
            console.log("error")
            setAlertGlobal({status: true, message: `La cantidad seleccionada supera el stock en la tienda`, type: 'red'})
            //product.cantidad= 0
        }
        //const cantidadProduct= Number(product.cantidad)
        if(cantidadProduct < 1){
            console.log("error")
            setAlertGlobal({status: true, message: `La cantidad seleccionada debe ser superior a 0`, type: 'red'})   
            return
          }
    }
    return <>
     <div>
      
<div className="m-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src="/productnotfound.png" alt="product not found" />
    </a>
    <div className="p-5">
        <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{productRef.name}</h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{productRef.description}</p>
        <div>
          <strong>Existen: </strong>
          <p>{productRef.cantidad as number}</p>
        </div>
        <input id={productRef._id as string} type="number" min={0} max={productRef.cantidad as number} pattern={`\d{${0},${productRef.cantidad}}`}
        onChange={changeInputValue} placeholder="cantidad"
        className="m-2"
        />
        <a onClick={add} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Agregar al carrito
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>

     </div> 
    </>
}

export default cardProduct;