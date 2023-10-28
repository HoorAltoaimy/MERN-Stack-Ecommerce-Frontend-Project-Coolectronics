import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductsState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchInput: string
  singleProduct: Product
}

const initialState: ProductsState = {
  products: [],
  error: null,
  isLoading: false,
  searchInput: '',
  singleProduct: {} as Product //creating empty product as an initial value
}

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  try {
    const response = await api.get('/mock/e-commerce/products.json')
    if (!response) {
      throw new Error('Network erroe')
    }
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchInput = action.payload
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload
      console.log(sortingCriteria)
      if (sortingCriteria === 'none') {
        state.products.sort((a, b) => a.id - b.id)
      }
      if (sortingCriteria === 'lowerPrice') {
        state.products.sort((a, b) => a.price - b.price)
      }
      if (sortingCriteria === 'hieghrPrice') {
        state.products.sort((a, b) => b.price - a.price)
      }
    },
    showProductDetailes: (state, action) => {
      const id = action.payload
      const productFound = state.products.find((product) => product.id === id)
      if (productFound) {
        state.singleProduct = productFound
      }
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    deleteProduct: (state, action) => {
      const id = action.payload
      const filteredProducts = state.products.filter((product) => product.id !== id)
      state.products = filteredProducts
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'Error has occured!'
      state.isLoading = false
    })
  }
})

export const { searchProduct, sortProducts, showProductDetailes, addProduct, deleteProduct } =
  productsSlice.actions
export default productsSlice.reducer
