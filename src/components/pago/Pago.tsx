import React, { useState } from 'react';
import "./Pago.css"
import Card, { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

function Pago(){
  // const [cardInfo, setCardInfo] = useState({
  //   number: '',
  //   name: '',
  //   expiryYear: '',
  //   expiryMonth: '',
  //   cvc: '',
  // });
  // const handleInputChangee = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setCardInfo({ ...cardInfo, [name]: value });
  // };
  
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: "",
  });

  const handleInputChange = (evt:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt:React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }
  
  const sendPago = ():String => {
      console.log(state)
      return "refff";
  }

  return (
    <>
    <div>
      <Card
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus as Focused}
      />
      <form>
        <input
          type="text"
          name="name"
          placeholder="name user"
          value={state.name}
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
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
        />
        <input
          type="text"
          name="expiry"
          placeholder="01/24"
          required
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
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
        />
      </form>
      <button onClick={sendPago}>Enviar</button>
    </div>
    </>
  );
}

export default Pago;