import axios from "axios"
import u from '../utils/env/env'
import pay from "../../model/pago/pago"
 
//function sendPago(tokenAccept:String, tokenTarjeta:String){
async function sendPago(_pay:pay){
  const {acceptance_token, payment_method, amount_in_cents, infoCarrito, currency, customer_email, customer_data, signature, reference}= _pay
  console.log(payment_method)
  const token= payment_method.token
  console.log(token)
    const bodyPay= await axios.post(`${u.API}/pago/sendmepago`, {   
      acceptance_token,
      infoCarrito,
      reference,
      amount_in_cents,
      currency,
      signature,
      // "payment_method": {
      //  "type": "CARD",
      //  "installments": 1, // Número de cuotas
      //  token
      // },
      payment_method,
      customer_email,
      customer_data
      // "customer_data": {
      //   "legal_id": "20121221",
      //   "phone_number": "+573145678901",
      //   "full_name": "Ivan Otero (Van)",
      //   "legal_id_type": "CC"
      // }
    })
    if(!bodyPay) return null 
    const pay= bodyPay?.data
    console.log(pay)
    return pay
}
export default sendPago