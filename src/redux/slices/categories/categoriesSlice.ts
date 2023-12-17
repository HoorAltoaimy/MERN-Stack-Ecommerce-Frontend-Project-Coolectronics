import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Category = {
  // id: number
  // name: string

  _id: string
  title: string
  slug: string
  createdAt?: string
  updatedAt: string
  __v: number
}

export type CategoriesState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  category: null | Category
}

const categoryData =
  localStorage.getItem('categoryData') !== null
    ? JSON.parse(String(localStorage.getItem('categoryData')))
    : []

const initialState: CategoriesState = {
  categories: [],
  error: null,
  isLoading: false,
  category: categoryData.category
}

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
  try {
    const response = await api.get('/mock/e-commerce/categories.json')
    //const response = await api.get('http://localhost:5050/api/categories')
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
      // api.post('http://localhost:5050/api/categories')
      // window.location.reload()
      // fetchCategories()
    },
    deleteCategory: (state, action) => {
       const id = action.payload
      const filteredCategories = state.categories.filter((category) => category._id !== id)
      if (filteredCategories) {
        state.categories = filteredCategories
      }

      // api.delete(`http://localhost:5050/api/categories/${action.payload}`)
      // window.location.reload()
      // fetchCategories()
    },
    editCategory: (state, action) => {
       const { id, title } = action.payload
      const categoryFound = state.categories.find((category) => category._id === id)
      if (categoryFound) {
        categoryFound.title = title
      }

      // api.put(`http://localhost:5050/api/categories/${id}`)
      // window.location.reload()
      // fetchCategories()
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
      state.error = action.error.message || 'An Error has occured!'
      state.isLoading = false
    })
  }
})

export const { addCategory, deleteCategory, editCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
