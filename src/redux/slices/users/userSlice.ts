import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true

export type User = {
  _id: string
  username: string
  email: string
  password: string
  image: string
  address: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
}

type ResetData = {
  password: string
  token: string
}

export type UpdatedUserType = {
  _id: string
  username: string
  email?: string
  address?: string
  phone?: string
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

export const baseURL = 'http://localhost:5050/api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(`${baseURL}/users`) //get.<User[]>
    if (!response) {
      throw new Error('No response')
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.msg)
    }
  }
})

export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUser: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users/process-register`, newUser)
      if (!response) {
        throw new Error('No response')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const activateUser = createAsyncThunk(
  'users/activateUser',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users/activate`, { token })
      if (!response) {
        throw new Error('No response')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete<User[]>(`${baseURL}/users/${id}`)
      if (!response) {
        throw new Error('No response')
      }
      return id
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (userData: UpdatedUserType, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseURL}/users/update-user-info/${userData._id}`,
        userData
      )
      if (!response) {
        throw new Error('No response')
      }
      // return userData._id
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const banUser = createAsyncThunk(
  'users/banUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/ban/${id}`)
      if (!response) {
        throw new Error('No response')
      }
      return id
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const unbanUser = createAsyncThunk(
  'users/unbanUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/unban/${id}`)
      if (!response) {
        throw new Error('No response')
      }
      return id
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (user: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, user)
      if (!response) {
        throw new Error('No response')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/logout`)
    if (!response) {
      throw new Error('No response')
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.msg)
    }
  }
})

export const forgetPassword = createAsyncThunk(
  'users/forgetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users/forget-password`, { email })
      if (!response) {
        throw new Error('No response')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (data: ResetData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/users/reset-password`, {
        password: data.password,
        token: data.token
      })
      if (!response) {
        throw new Error('No response')
      }
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchInput = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers(builder) {
    //fetchUsers
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload?.payload.users
      state.isLoading = false
    })

    //createUser
    builder.addCase(createUser.fulfilled, (state) => {
      state.isLoading = false
    })

    //activateUser
    builder.addCase(activateUser.fulfilled, (state, action) => {
      state.users.push(action.payload.payload)
    })

    //deleteUser
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const id = action.payload
      const filteredUsers = state.users.filter((user) => user._id !== id)
      if (filteredUsers) {
        state.users = filteredUsers
      }
      state.isLoading = false
    })

    //updateUserProfile
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      const { username, email, phone, address } = action.payload.payload

      if (state.userData) {
        state.userData.username = username
        state.userData.email = email
        state.userData.phone = phone
        state.userData.address = address
      }

      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedin: state.isLoggedin,
          userData: state.userData
        })
      )
      // }
    })

    //banUser
    builder.addCase(banUser.fulfilled, (state, action) => {
      const id = action.payload
      const userFound = state.users.find((user) => user._id === id)
      if (userFound) {
        userFound.isBanned = true
      }
      state.isLoading = false
    })

    //unbanUser
    builder.addCase(unbanUser.fulfilled, (state, action) => {
      const id = action.payload
      const userFound = state.users.find((user) => user._id === id)
      if (userFound) {
        userFound.isBanned = false
      }
      state.isLoading = false
    })

    //loginUser
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedin = true
      state.userData = action.payload.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedin: state.isLoggedin,
          userData: state.userData
        })
      )
    })

    //logoutUser
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoggedin = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedin: state.isLoggedin,
          userData: state.userData
        })
      )
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

export const { searchUser, clearError } = usersSlice.actions
export default usersSlice.reducer
