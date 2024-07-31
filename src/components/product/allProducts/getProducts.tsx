import axios from 'axios'
async function getAllProducts(){
 const infoAxios = await axios.get(`/product/allproducts`)
 .catch(err => {
    console.log("error tokenizando tarjeta")
    console.log(err)
    return null
 })
 const listProduct= await infoAxios?.data
 console.log("listProduct: ")
 console.log(listProduct)
}

export default getAllProducts