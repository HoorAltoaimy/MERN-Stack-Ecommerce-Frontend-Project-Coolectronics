import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/products/productsSlice'
import categoriesSlice from './slices/categories/categoriesSlice'
import ordersSlice from './slices/orders/ordersSlice'
import usersSlice from './slices/users/userSlice'

export const store = configureStore({
  reducer: {
    productsReducer: productsSlice,
    categoriesReducer: categoriesSlice,
    ordersReducer: ordersSlice,
    usersReducer: usersSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
