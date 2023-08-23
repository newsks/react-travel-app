import React, { useContext, useState } from 'react'
import { OrderContext } from '../../context/OrderContext';

const SummaryPage = ({ setStep }) => {

  const [ checked, setChecked ] = useState(false);
  const [ orderDetails ] = useContext(OrderContext);

  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key,value])=>(
    <li key={key}>
      {value} {key}
    </li>
  ))

  const hasOptions = orderDetails.options.size > 0
  let optionsDisplay = null;

  if(hasOptions) {
    const optionsArray = Array.from(orderDetails.options.keys());
    const optionList = optionsArray.map((key)=> <li key={key}>{key}</li>)
    optionsDisplay = (
      <>
      <h2>옵션:  ₩ {orderDetails.totals.options}</h2>
      <ul>{optionList}</ul>
      </>
    )
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    setStep(2);
  }

  return (
    <div style={{paddingTop:"5px", paddingBottom:"5px"}}>
      <h1>주문확인</h1>
      <h2>여행 상품: ₩ { orderDetails.totals.products } </h2>
      <ul>
        {productList}
      </ul>
      
        {optionsDisplay}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="checkbox"
          defaultChecked={checked}
          id="confirm-checkbox"
          onClick={(e)=> setChecked(e.target.checked)}
        />
        <label htmlFor="confirm-checkbox" style={{ fontWeight:"bold", marginLeft:"10px" }}>
          주문하려는 것을 확인하셨나요?
        </label>
        <br />
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  )
}

export default SummaryPage