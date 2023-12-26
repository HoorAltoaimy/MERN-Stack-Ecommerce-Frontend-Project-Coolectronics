import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_BASE_URL } from '../users/userSlice'
//import { Category } from '../categories/categoriesSlice'

export type Product = {
  _id: string
  title: string
  slug?: string
  price: string
  category: string
  image: File | undefined | string
  description: string
  quantity: string
  sold?: string
  shipping: string
}

export type ProductsState = {
  products: Product[]
  originalProductsSort: Product[]
  pagination: {
    currentPage: number
    totalPages: number
    totalProducts: number
  }
  error: null | string
  isLoading: boolean
  searchInput: string
  singleProduct: Product
}

const initialState: ProductsState = {
  products: [],
  originalProductsSort: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  },
  error: null,
  isLoading: false,
  searchInput: '',
  singleProduct: {} as Product //creating empty product as an initial value
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (data: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products?page=${data.page}&limit=${data.limit}`
      )
      if (!response) {
        throw new Error('No response')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //throw new Error(error.response?.data.msg)
        return rejectWithValue(error.response?.data.errors[0] || error.response?.data.msg)
      }
    }
  }
)

export const filterProducts = createAsyncThunk(
  'products/filterProducts',
  async (
    data: { page: number; limit: number; selectedCategories: string[]; priceRange: number[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/products/filter-products?page=${data.page}&limit=${data.limit}`,
        data
      )
      if (!response) {
        throw new Error('No response')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.errors[0] || error.response?.data.msg)
      }
    }
  }
)

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/singleProduct/${slug}`)
      if (!response) {
        throw new Error('No response')
      }
      return response.data.payload
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.errors[0] || error.response?.data.msg)
      }
    }
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, newProduct)
      if (!response) {
        throw new Error('No response')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.errors[0] || error.response?.data.msg)
      }
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ updatedProduct, id }: { updatedProduct: FormData; id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/products/update-product-info/${id}`,
        updatedProduct
      )
      if (!response) {
        throw new Error('No response')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.errors[0] || error.response?.data.msg)
      }
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`)
      if (!response) {
        throw new Error('No response')
      }
      return id
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.errors[0] || error.response?.data.msg)
      }
    }
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchInput = action.payload
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      if (sortingCriteria === 'none') {
        state.products = state.originalProductsSort
      } else if (sortingCriteria === 'lowerPrice') {
        state.products.sort((a, b) => Number(a.price) - Number(b.price))
      } else if (sortingCriteria === 'hieghrPrice') {
        state.products.sort((a, b) => Number(b.price) - Number(a.price))
      } else if (sortingCriteria === 'title') {
        state.products.sort((a, b) => a.title.localeCompare(b.title))
      }
    }
  },
  extraReducers(builder) {
    //fetchProducts
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const { currentPage, totalPages, totalProducts } = action.payload.payload.pagination
      state.pagination = {
        currentPage,
        totalPages,
        totalProducts
      }
      state.products = action.payload.payload.products
      state.originalProductsSort = state.products
      state.isLoading = false
    })

    //filterProducts
    builder.addCase(filterProducts.fulfilled, (state, action) => {
      const { currentPage, totalPages, totalProducts } = action.payload.payload.pagination
      state.pagination = {
        currentPage,
        totalPages,
        totalProducts
      }
      state.products = action.payload.payload.products
      state.originalProductsSort = state.products
      state.isLoading = false
    })

    //fetchSingleProduct
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload
      state.isLoading = false
    })

    //createProduct
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload.payload)
      state.originalProductsSort = state.products
      state.isLoading = false
    })

    //updateProduct
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const { _id, title, image, description, category, price, quantity, shipping } =
        action.payload.payload
      const productFound = state.products.find((product) => product._id === _id)
      if (productFound) {
        productFound.title = title
        productFound.image = image
        productFound.description = description
        productFound.category = category
        productFound.price = price
        productFound.quantity = quantity
        productFound.shipping = shipping
      }
      state.isLoading = false
    })

    //deleteProduct
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const id = action.payload
      const filteredProducts = state.products.filter((product) => product._id !== id)
      if (filteredProducts) {
        state.products = filteredProducts
        state.originalProductsSort = state.products
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

export const { searchProduct, sortProducts } = productsSlice.actions
export default productsSlice.reducer
