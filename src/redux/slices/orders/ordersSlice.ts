import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type OrdersState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
}

const initialState: OrdersState = {
  orders: [],
  error: null,
  isLoading: false
}

export const fetchOrders = createAsyncThunk('fetchOrders', async () => {
  const response = await api.get('/mock/e-commerce/orders.json')
  return response.data
})

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message || 'Error has occured!'
      state.isLoading = false
    })
  }
})

export default ordersSlice.reducer
