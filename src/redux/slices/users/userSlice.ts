import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  isBlocked: boolean
}

export type UsersState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedin: boolean
  userData: null | User
  searchInput: string
}

const loginData =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: UsersState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedin: loginData.isLoggedin,
  userData: loginData.userData,
  searchInput: ''
}

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  try {
    const response = await api.get('/mock/e-commerce/users.json')
    if (!response) {
      throw new Error('Network erroe')
    }
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedin = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedin: state.isLoggedin,
          userData: state.userData
        })
      ) //arguments ('key', value)
    },
    logout: (state) => {
      state.isLoggedin = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedin: state.isLoggedin,
          userData: state.userData
        })
      )
    },
    searchUser: (state, action) => {
      state.searchInput = action.payload
    },
    editProfile: (state, action) => {
      const { id, firstName, lastName } = action.payload
      const userFound = state.users.find((user) => user.id === id)
      if (userFound) {
        userFound.firstName = firstName
        userFound.lastName = lastName
        state.userData = userFound
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedin: state.isLoggedin,
            userData: state.userData
          })
        )
      }
       
    },
    deleteUser: (state, action) => {
      const filteredUsers = state.users.filter((user) => user.id !== action.payload)
      state.users = filteredUsers
    },
    blockUser: (state, action) => {
      const id = action.payload
      const userFound = state.users.find((user) => user.id === id)
      if (userFound) {
        userFound.isBlocked = !userFound.isBlocked
      }
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
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
      state.error = action.error.message || 'An Error has occured'
      state.isLoading = false
    })
  }
})

export const { login, logout, searchUser, editProfile, deleteUser, blockUser, addUser } = usersSlice.actions
export default usersSlice.reducer
