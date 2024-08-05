import React, { useEffect, useState } from 'react';
import "./Pago.css"
import Card, { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import axios from 'axios';
import usePago from '../pago/sendPago'
import a from './../utils/env/env'
import pay from "../../model/pago/pago"
import UserPay from './infoUser/userPago';
import infoUser from '../../model/pago/infoUser/userPago';
import Product from '../../model/product/product';

async function finalizarPago(infoPago:pay){
  const body= await usePago(infoPago)
  return body
}
 
async function getAccept(){
 const acceptStore= await axios.get(`${a.API}/pago/retornartokenaceptacion`)
 .catch(err => {
  console.log("error tokenizando tarjeta")
  console.log(err)
  return null
 })
 const jsonAccept= acceptStore?.data
 //const accept= jsonAccept.success.acceptanceToken
 const body= jsonAccept.success
 return body
}
async function getTokTarjeta(infoTarjeta:{number: String, expiry: String, cvc: String, name: String, focus: String, email: String}){
  const tokBody= await axios.post(`${a.API}/pago/tokenizartarjeta`, infoTarjeta)
  .catch(err => {
    console.log("error tokenizando tarjeta")
    console.log(err)
    return null
  })
  const body= await tokBody?.data.success
  const tok= body.id
  return tok;
}

function Pago({infoTarjeta, setInfoTarjeta, infoCarrito, setLoad, setAlertGlobal, setShowCart, setProductCard}:{infoTarjeta:{toktarjeta:String, acceptConfirm:String}, setInfoTarjeta:Function, infoCarrito:Product[], setLoad:Function, setAlertGlobal:Function, setShowCart:Function, setProductCard:Function}){
  const [tokenTarjeta, setTokenTarjeta]= useState<String>('')
  const [state, setState] = useState<{number: string, expiry: string, cvc: string, name: string, focus: string, email: string}>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: "",
    email: ""
  });
  const [isGoodTok, setIsGoodTok]= useState(false)
  const [user, setUser]= useState<infoUser>({
    full_name: '',
    legal_id_type: '',
    legal_id: '',
    phone_number: ''
   })
   const [isAccepted, setIsAccepted]= useState(false)
   const [rutaPdf, setRutaPdf]= useState("")
   const [isTarjeta, setIsTarjeta]= useState(Boolean)
  useEffect(() => {
   async function ejecutarAccept() {
    const acceptConfirm= await getAccept()
    const jsonConfirm= Object.assign(acceptConfirm)
    const acceptConfirmTok= jsonConfirm.acceptanceToken
    setRutaPdf(await jsonConfirm.permaLink)
    //acceptanceToken
    setInfoTarjeta({...infoTarjeta, acceptConfirm: acceptConfirmTok})
   }
   ejecutarAccept()
  }, [])
  const handleInputChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt:React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }
  
  useEffect(() => {
    if(infoTarjeta.toktarjeta && isGoodTok){
      async function puying(){
        //let {acceptConfirm, email, toktarjeta, cvc, expiry, focus, name, number}= Object.assign(state, infoTarjeta)
        let {acceptConfirm, email, toktarjeta }= Object.assign(state, infoTarjeta)
        let amount_in_cents= 160000
        let reference= "lol"
        let signature= "refff"
        let currency= "COP"
        let cardType= "CARD"
        const bodyPay= await finalizarPago({acceptance_token:acceptConfirm as string, amount_in_cents, currency, customer_data: user, customer_email: email, infoCarrito: {listProduct:infoCarrito}, payment_method: {installments: 1, type: cardType, token: toktarjeta as string}, reference, signature})
        if(bodyPay.status == 200){
          setShowCart(false)
          setLoad(false)
          setAlertGlobal({status: true, message: "su pago se realizo satisfactoriamente", type: 'green'})
          setProductCard([])
          return
        }
        setLoad(false)
        //setShowCart(false)
        setAlertGlobal({status: true, message: bodyPay.success, type: 'red'})
        return
      }
      puying()
    }
    console.log("info tar: ")
    console.log(infoTarjeta)
    setAlertGlobal({status: true, message: "Error con la tarjeta", type: 'red'})
  }, [tokenTarjeta])

  const sendPago = () => {
    if(state.number.length > 11 && state.cvc.length > 2 && isAccepted){
      setLoad(true)
      //se verifica la tarjeta, y se retorna tokenTarjeta
      // useEffect(() => {
        
      // }, [])
      async function getTokTarjetaPago(){
        const toktarjeta= await getTokTarjeta(state)
        setInfoTarjeta((prev:any) => {
          return {...prev, toktarjeta}
        })
        if(!toktarjeta || toktarjeta.length < 0){
          setIsGoodTok(false)
        }
        console.log("tokenizando")
        console.log(toktarjeta)
        setIsGoodTok(true)
        setTokenTarjeta(toktarjeta)
      }
      getTokTarjetaPago()
      
      if(!isGoodTok){
        setAlertGlobal({status: true, message: 'debe validar los datos de su tarjeta, valide la informacion de usuario', type: 'yellow'})
        return
      }
      setAlertGlobal({status: true, message: 'su compra se esta realizando', type: 'orange'})
      return
    }
    setAlertGlobal({status: true, message: 'debe validar los datos de su tarjeta, valide la informacion de usuario', type: 'yellow'})
    return
  }

  return (
  <>
   <div>
    <div>
     <section>
        <div>
           <h2>User</h2>
           <p>{user.full_name}</p>
           <h2><strong>{user.legal_id_type}</strong></h2>
           <strong>{user.legal_id}</strong>
           <p>{user.phone_number}</p>
        </div>
        <div className='p-1'>
        <UserPay user={user} setUser={setUser} urlPdfAccept={rutaPdf} setIsAccepted={setIsAccepted} isAccepted={isAccepted}/>
        </div>
      </section>
    </div>
    <div>
    <div>
      <h2>Pagar con:</h2>
    </div>
    <div onClick={() => setIsTarjeta(!isTarjeta)} className='flex flex-wrap justify-center bg-blue-500'>
     {/* <h2 className='m-1'>Pagar con</h2>  */}
     <div className='m-2'>
     <div> 
       <div className='flex flex-wrap justify-center p-1'>
        <img src="/visa.svg" height="32px" width="32px" alt="visa"/>
        <img width="32px" src="/mastercard.svg" alt="mastercard" />
       </div>
     </div>
     </div>
    </div>
    </div>
    { isTarjeta ? <div>
      <div className='m-4 flex flex-wrap justify-center'>
      <Card
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus as Focused}
      />
      </div>
      <form className='flex flex-wrap'>
        <input 
          type='email'
          name='email'
          placeholder='email'
          value={state.email}
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="text"
          name="name"
          placeholder="name user"
          value={state.name}
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="tel"
          name="number"
          placeholder="Card Number"
          pattern='[\d| ]{16,22}' 
          required
          maxLength={22}
          minLength={16}
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="text"
          name="expiry"
          placeholder="01/24"
          required
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="tel"
          name="cvc"
          placeholder="cvc"
          pattern='\d{3,4}'
          minLength={3}
          maxLength={4}
          required
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 m-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </form>
      { isAccepted ? <button className="font-medium text-center m-2 w-full px-3 py-2 text-sm text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={sendPago}>Enviar</button> : <strong>"Acepta los terminos y condiciones de pago"</strong> }
    </div>  : <></> }
     </div>
  </>
  );
}

export default Pago;