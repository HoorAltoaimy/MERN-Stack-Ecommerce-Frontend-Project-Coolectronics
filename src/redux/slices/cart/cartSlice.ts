import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../products/productsSlice'
import axios from 'axios'
import { API_BASE_URL } from '../users/userSlice'

const data =
  localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

type cartState = {
  cartItems: Product[]
  error: null | string
  isLoading: boolean
}

const initialState: cartState = {
  cartItems: data,
  error: null,
  isLoading: false
}

export const fetchBraintreeToken = createAsyncThunk('cart/fetchBraintreeToken', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/braintree/token`)
    if (!response) {
      throw new Error('No response')
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.msg)
    }
  }
})

export const braintreePayment = createAsyncThunk('cart/braintreePayment', async (data: object) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders/braintree/payment`, data)
    if (!response) {
      throw new Error('No response')
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.msg)
    }
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      const filteredItems = state.cartItems.filter((cartItem) => cartItem._id !== id)
      state.cartItems = filteredItems
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    clearCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cart')
    }
  },
  extraReducers(builder) {
    //for all requests
    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
      }
    )

    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.error = action.payload || 'An Error has occured'
        state.isLoading = false
      }
    )
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
