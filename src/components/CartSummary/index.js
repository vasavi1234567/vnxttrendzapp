// Write your code here
import Popup from 'reactjs-popup'
import Payment from '../Payment'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const items = cartList.length
      let total = cartList.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      )

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total">
              <span className="value">Order Total: </span>Rs {total} /-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>
            <Popup
              modal
              trigger={
                <button className="checkout-button" type="button">
                  Checkout
                </button>
              }
              position="top left"
            >
              {close => <Payment close={close} />}
            </Popup>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
