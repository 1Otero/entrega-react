import Pago from "../pago/Pago"
import useProduct from './allProducts/getProducts'

const Product= ({load, setLoad}:{load:Boolean, setLoad:Function}) =>{
    function ejecutar(){
        setLoad(!load)
        console.log(load)
        return
    }
    useProduct()
    return <>
      <div>
       <div>
        <h2>{load?<h2>loading</h2>:<h2>list:</h2>}</h2>
        <p>Product...</p>
       </div>
       <button onClick={ejecutar}>Load</button>
      </div>
      <Pago />
    </>
}

export default Product