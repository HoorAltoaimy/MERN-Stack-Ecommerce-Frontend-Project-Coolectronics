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
  try {
    const response = await api.get('/mock/e-commerce/categories.json')
    if (!response) {
      throw new Error('Network erroe')
    }
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    deleteCategory: (state, action) => {
      const id = action.payload
      const filteredCategories = state.categories.filter((category) => category.id !== id)
      if (filteredCategories) {
        state.categories = filteredCategories
      }
    }
  },
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

export const { addCategory, deleteCategory } = categoriesSlice.actions
export default categoriesSlice.reducer