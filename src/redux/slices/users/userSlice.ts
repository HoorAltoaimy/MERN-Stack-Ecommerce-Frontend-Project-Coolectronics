import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export type UsersState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedin: boolean
  userData: null | User
}

//set the (isLoggedin,userData) in the local storage

const initialState: UsersState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedin: false,
  userData: null
}

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  const response = await api.get('/mock/e-commerce/users.json')
  return response.data
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true
      state.userData = action.payload
    },
    logout: (state) => {
      state.isLoggedin = false
      state.userData = null
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message || 'Error has occured'
      state.isLoading = false
    })
  }
})

export const { login, logout } = usersSlice.actions
export default usersSlice.reducer
