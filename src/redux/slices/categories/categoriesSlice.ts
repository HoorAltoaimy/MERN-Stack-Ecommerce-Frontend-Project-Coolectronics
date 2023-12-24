import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export type Category = {
  _id: string
  title: string
  slug: string
  // createdAt: string
  // updatedAt: string
  // __v: number
}

export type CategoriesState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  category: null | Category
  status: null | string
}

const categoryData =
  localStorage.getItem('categoryData') !== null
    ? JSON.parse(String(localStorage.getItem('categoryData')))
    : []

const initialState: CategoriesState = {
  categories: [],
  error: null,
  isLoading: false,
  category: categoryData.category,
  status: null
}

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`)
    if (!response) {
      throw new Error('Network erroe')
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.msg)
    }
  }
})

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (newCategory: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, {title: newCategory}) 

      if (!response) {
        throw new Error('Network erroe')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const editCategory = createAsyncThunk(
  'categories/editCategory',
  async (editedCategoryData: Partial<Category>, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/categories/${editedCategoryData._id}`,
        {title: editedCategoryData.title}
      )
      if (!response) {
        throw new Error('Network erroe')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/categories/${id}`)
      if (!response) {
        throw new Error('Network erroe')
      }
      return id
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    //fetchCategories
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.payload
      state.status = action.payload.message
    })

    // createCategory
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.payload)
      state.status = action.payload.message
    })

    //deleteCategory
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const id = action.payload
      const filteredCategories = state.categories.filter((category) => category._id !== id)
      if (filteredCategories) {
        state.categories = filteredCategories
      }
      state.isLoading = false
    })

    //editCategory
    builder.addCase(editCategory.fulfilled, (state, action) => {
      const { _id, title } = action.payload.payload
      const categoryFound = state.categories.find((category) => category._id === _id)
      if (categoryFound) {
        categoryFound.title = title
      }
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

export default categoriesSlice.reducer
