import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const Payment = () => {
  const {cartList} = useContext(CartContext)

  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrdered, setIsOrdered] = useState(false)

  const updatePayment = event => {
    const {id} = event.target
    setPaymentMethod(id)
  }

  const onOrder = () => setIsOrdered(true)

  const getTotal = () =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  const renderPayment = () => (
    <ul className="payment-methods-list">
      {paymentList.map(eachMethod => (
        <li className="method" key={eachMethod.id}>
          <input
            className="input"
            type="radio"
            name="paymentMethod"
            id={eachMethod.id}
            disabled={eachMethod.isDisabled}
            onChange={updatePayment}
          />
          <label
            className={`label ${eachMethod.isDisabled ? 'disabled-label' : ''}`}
            htmlFor={eachMethod.id}
          >
            {eachMethod.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="payment-container">
      {isOrdered ? (
        <p className="success-message">
          Your order has been placed successfully
        </p>
      ) : (
        <div>
          <h1 className="payments-details">Payments Details</h1>
          <p className="payment-method">Payment Method</p>
          {renderPayment()}
          <div className="order-details-container">
            <p className="order-details">Order details</p>
            <p>Quantity: {cartList.length}</p>
            <p>Total Price: Rs {getTotal()}/-</p>
          </div>
          <button
            className="confirm-button"
            type="button"
            disabled={paymentMethod === ''}
            onClick={onOrder}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  )
}

export default Payment
