import axios from 'axios'
import a from './../../utils/env/env'
import Product from './../../../model/product/product'

async function getAllProducts():Promise<Product[]>{
 const infoAxios = await axios.get(`${a.API}/product/allproducts`)
 .catch(err => {
    console.log("error tokenizando tarjeta")
    console.log(err)
    return null
 })
 const listProduct= await infoAxios?.data
 if(listProduct.status == 404){
   Promise.resolve(null)
 }
 return listProduct.success
}

export default getAllProducts