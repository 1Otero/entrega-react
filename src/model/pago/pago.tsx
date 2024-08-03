import Product from "../product/product"
import infoUser from "./infoUser/userPago"

interface sendPago{   
    "acceptance_token": string,
    "infoCarrito": {
      "listProduct": Product[]
    },
    "reference": string,
    "amount_in_cents": Number,
    "currency": string,
    "signature": string,
    "payment_method": {
    "type": string,
    "installments": Number, // Número de cuotas
    "token": string
    },
    "customer_email": string,
    // "customer_data": {
    //     "legal_id": string,
    //     "phone_number": string,
    //     "full_name": string,
    //     "legal_id_type": string
    // }
    "customer_data": infoUser
}

export default sendPago