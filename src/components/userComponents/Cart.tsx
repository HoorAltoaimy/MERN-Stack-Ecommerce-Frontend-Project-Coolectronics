import { useState } from 'react'
import { FaPaypal, FaTrash } from 'react-icons/fa'
import { SiApplepay } from 'react-icons/si'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import useCartState from '../../hooks/useCartState'
import { clearCart, removeFromCart } from '../../redux/slices/cart/cartSlice'
import { AppDispatch } from '../../redux/store'

const Cart = () => {
  const { cartItems } = useCartState()

  const [toastCount, setToastCount] = useState(0)

  const dispatch: AppDispatch = useDispatch()

  const handleRemoveFromCart = (id: number) => {
    if (toastCount < 1) {
      toast.success('Item removed successfully')
      setToastCount(toastCount + 1)
    }
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    if (toastCount < 1) {
      toast.success('Items removed successfully')
      setToastCount(toastCount + 1)
    }
    dispatch(clearCart())
  }

  const cartTotal = () => {
    let totalAmount = 0
    cartItems.length > 0 && cartItems.map((cartItem) => (totalAmount += cartItem.price))
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
                  const { id, image, name, description, price } = cartItem
                  return (
                    <article className="cart-item" key={id}>
                      <div className="cart-image">
                        <img src={image} alt={name} width={200} />
                      </div>

                      <div className="cart-info">
                        <h4>{name}</h4>
                        <p>{description}</p>
                        <h4>${price}</h4>

                        <button
                          className="delete-icon"
                          onClick={() => {
                            handleRemoveFromCart(id)
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
                <p>Delivery Address: aaa-666</p>
                {/* <Link to='/'>Update Delivery Addres</Link> */}
                <p>Payment options:</p>
                <SiApplepay size={40} />
                <FaPaypal size={40} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
