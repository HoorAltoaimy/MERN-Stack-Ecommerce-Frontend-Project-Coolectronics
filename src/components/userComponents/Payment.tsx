import DropIn from 'braintree-web-drop-in-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { braintreePayment, fetchBraintreeToken } from '../../redux/slices/cart/cartSlice'
import { AppDispatch } from '../../redux/store'
import { Product } from '../../redux/slices/products/productsSlice'
import showToast from '../../utils/toastUtils'

const Payment = ({cartItems, amount}: {cartItems: Product[], amount: number}) => {
    const [braintreeClientToken, setBraintreeClientToken] = useState(null)

    const [instance, setInstance] = useState()
    
    const dispatch: AppDispatch = useDispatch()

    const getBraintreeClientToken = async () => {
        try {
            const response = await dispatch(fetchBraintreeToken())
            setBraintreeClientToken(response.payload.payload.clientToken)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
      getBraintreeClientToken()
    }, [])

    const handlePayment = async () => {
        if (instance) {
            const { nonce } = await instance.requestPaymentMethod()
            const response = await dispatch(braintreePayment({ nonce, cartItems, amount }))
            //showToast('success', response)
            console.log(response);
        }
    }
    
  return (
    <div>
      {braintreeClientToken && (
        <DropIn
          options={{ authorization: braintreeClientToken }}
          onInstance={(instance) => setInstance(instance)}
        />
      )}

      <button className='btn' onClick={handlePayment}>Place order</button>
    </div>
  )
}

export default Payment
