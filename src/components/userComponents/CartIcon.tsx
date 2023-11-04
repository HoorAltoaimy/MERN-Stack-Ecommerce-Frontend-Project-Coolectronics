import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'

const CartIcon = ({ value }: { value: number }) => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  console.log(cartItems)
  return (
    <div className="cart-icon">
      <AiOutlineShoppingCart size={25} />
      <span className="badge">{value}</span>
    </div>
  )
}

export default CartIcon
