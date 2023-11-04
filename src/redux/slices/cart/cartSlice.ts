import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../products/productsSlice";

const data = localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))): []

type cartState = {
    cartItems: Product[]
}

const initialState: cartState = {
  cartItems: data
}

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
            const filteredItems = state.cartItems.filter((cartItem) => cartItem.id !== id)
            state.cartItems = filteredItems
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        clearCart: (state) => {
            state.cartItems = []
            localStorage.removeItem('cart')

        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
