import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_BASE_URL } from '../users/userSlice'

export type Order = {
  _id: string
  products: string[]
  buyer: string
  createdAt: string
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

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`)
    if (!response) {
      throw new Error('Network error')
    }
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/orders/${id}`)
    if (!response) {
      throw new Error('Network error')
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
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload.payload
      state.isLoading = false
    })

    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      const id = action.payload.payload
      const filteredOrders = state.orders.filter((order) => order._id !== id)
       if (filteredOrders) {
         state.orders = filteredOrders
       }
       state.isLoading = false
     })

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

export const { searchOrder } = ordersSlice.actions
export default ordersSlice.reducer
