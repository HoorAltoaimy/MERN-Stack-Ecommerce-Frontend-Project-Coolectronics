import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Category = {
  id: number
  name: string
}

export type CategoriesState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoriesState = {
  categories: [],
  error: null,
  isLoading: false
}

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
  const response = await api.get('/mock/e-commerce/categories.json')
  return response.data
})

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.error.message || 'Error has occured!'
      state.isLoading = false
    })
  }
})

export default categoriesSlice.reducer
