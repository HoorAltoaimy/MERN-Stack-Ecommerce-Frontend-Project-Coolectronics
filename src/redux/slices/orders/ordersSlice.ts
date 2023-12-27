import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import axios from 'axios'
import { API_BASE_URL } from '../users/userSlice'

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
  searchInput: string
}

const initialState: OrdersState = {
  orders: [],
  error: null,
  isLoading: false,
  searchInput: ''
}

// export const fetchOrders = createAsyncThunk('fetchOrders', async () => {
//   try {
//     const response = await api.get('/mock/e-commerce/orders.json')
//     if (!response) {
//       throw new Error('Network erroe')
//     }
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// })

export const fetchOrders = createAsyncThunk('fetchOrders', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`)
    if (!response) {
      throw new Error('Network erroe')
    }
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    searchOrder: (state, action) => {
      state.searchInput = action.payload
    },
    deleteOrder: (state, action) => {
      const id = action.payload
      const filteredOrders = state.orders.filter((order) => order.id !== id)
      state.orders = filteredOrders
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      console.log(action.payload[0])
      state.orders = action.payload[0]
      //state.orders.push(action.payload[0])
      state.isLoading = false
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message || 'Error has occured!'
      state.isLoading = false
    })
  }
})

export const { searchOrder, deleteOrder } = ordersSlice.actions
export default ordersSlice.reducer
