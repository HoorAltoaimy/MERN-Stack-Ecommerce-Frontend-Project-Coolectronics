import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import axios from 'axios'
import { baseURL } from '../users/userSlice'

export type Category = {
  // id: number
  // name: string

  _id: string
  title: string
  // slug: string
  // createdAt?: string
  // updatedAt: string
  // __v: number
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

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await axios.get(`${baseURL}/categories`)
    console.log(response.data.payload);
    if (!response) {
      throw new Error('Network erroe')
    }
    return response.data.payload
  } catch (error) {
    console.log(error)
  }
})

export const createCategory = createAsyncThunk('categories/deleteCategory',async (newCategory: string) => {
  try {
    const response = await axios.post(`${baseURL}/categories`, newCategory)
    console.log(response);
    if (!response) {
      throw new Error('Network erroe')
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
    }
  }
})

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/categories/${id}`)
    if (!response) {
      throw new Error('Network erroe')
    }
    return id
  } catch (error) {
    console.log(error)
  }
})

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // addCategory: (state, action) => {
    //   state.categories.push(action.payload)
    //   // api.post('http://localhost:5050/api/categories')
    //   // window.location.reload()
    //   // fetchCategories()
    // },
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
    //fetchCategories
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })

    //createCategory
    // builder.addCase(createCategory.fulfilled, (state, action) => {
    //   state.categories.push(action.payload)
    // })

    //deleteCategory
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const id = action.payload
      const filteredCategories = state.categories.filter((category) => category._id !== id)
      if (filteredCategories) {
        state.categories = filteredCategories
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
        state.error = action.error.message || 'An Error has occured'
        state.isLoading = false
      }
    )
  }
})

export const { editCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
