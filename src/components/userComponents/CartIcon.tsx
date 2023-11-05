import { AiOutlineShoppingCart } from 'react-icons/ai'

const CartIcon = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon">
      <AiOutlineShoppingCart size={25} />
      <span className="badge">{value}</span>
    </div>
  )
}

export default CartIcon
