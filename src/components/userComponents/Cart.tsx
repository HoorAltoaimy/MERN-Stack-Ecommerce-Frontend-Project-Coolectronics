import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import useCartState from '../../hooks/useCartState'
import { clearCart, removeFromCart } from '../../redux/slices/cart/cartSlice'
import { AppDispatch } from '../../redux/store'
import showToast from '../../utils/toastUtils'
import useUsersState from '../../hooks/useUsersState'
import Payment from './Payment'

const Cart = () => {
  const { cartItems } = useCartState()

  const { isLoggedin, userData } = useUsersState()

  const [toastCount, setToastCount] = useState(0)

  const dispatch: AppDispatch = useDispatch()

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id))
    if (toastCount < 1) {
      showToast('success', 'Item removed successfully')
      setToastCount(toastCount + 1)
    }
    
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    if (toastCount < 1) {
      showToast('success', 'Items removed successfully')
      setToastCount(toastCount + 1)
    }
  }

  const cartTotal = () => {
    let totalAmount = 0
    cartItems.length > 0 && cartItems.map((cartItem) => (totalAmount += Number(cartItem.price)))
    return totalAmount
  }

  return (
    <div className="cart-body">
      <div className="cart-div">
        <div>
          <h3 className="title">Cart</h3>
          <h4 className="title">
            You have {cartItems.length > 0 ? cartItems.length : 0} item(s) in your cart
          </h4>
        </div>

        <div className="cart-layout">
          {cartItems.length > 0 && (
            <>
              <div className="clear-btn">
                <button className="btn" onClick={handleClearCart}>
                  Clear cart
                </button>
              </div>

              <div>
                {cartItems.map((cartItem) => {
                  const { _id, image, title, description, price } = cartItem
                  return (
                    <article className="cart-item" key={_id}>
                      <div className="cart-image">
                        <img src={image as string} alt={title} width={200} />
                      </div>

                      <div className="cart-info">
                        <h4>{title}</h4>
                        <p>{description}</p>
                        <h4>${price}</h4>

                        <button
                          className="delete-icon"
                          onClick={() => {
                            handleRemoveFromCart(_id)
                          }}>
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>

              <div className="checkout">
                <h3>Checkout</h3>
                <h4>Total: ${cartTotal()}</h4>
                <p>Delivery Address: {userData?.address}</p>
                {cartItems.length > 0 && isLoggedin ? <Payment cartItems={cartItems} amount={cartTotal()} /> : <p>Please login first</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
