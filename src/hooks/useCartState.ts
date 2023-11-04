import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useCartState = () => {
    const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  return { cartItems }
}

export default useCartState
