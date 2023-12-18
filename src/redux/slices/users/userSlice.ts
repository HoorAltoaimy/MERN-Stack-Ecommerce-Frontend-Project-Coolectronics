import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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

// export type userResponse = {
//   message: string
//   users: User[]
// }

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
      throw new Error('Network erroe')
    }
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  try {
  const response = await axios.delete<User[]>(`${baseURL}/users/${id}`)
    if (!response) {
      throw new Error('Network erroe')
    }
    return id
  } catch (error) {
    console.log(error)
  }
})

export const banUser = createAsyncThunk('users/banUser', async (id: string) => {
  //await axios.put(`${baseURL}/users/ban/${id}`)
  //return id
  try {
    const response = await axios.put(`${baseURL}/users/ban/${id}`)
    if (!response) {
      throw new Error('Network erroe')
    }
    return id
  } catch (error) {
    console.log(error)
  }
})

export const unbanUser = createAsyncThunk('users/unbanUser', async (id: string) => {
  //await axios.put(`${baseURL}/users/ban/${id}`)
  //return id
  try {
    const response = await axios.put(`${baseURL}/users/unban/${id}`)
    if (!response) {
      throw new Error('Network erroe')
    }
    return id
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
      const { id, username } = action.payload
      const userFound = state.users.find((user) => user._id === id)
      if (userFound) {
        //!modification in the fileds needed
        // userFound.firstName = firstName
        // userFound.lastName = lastName
        userFound.username = username
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
    deleteSingleUser: (state, action) => {
      state.users.push(action.payload)
    }
  },
  extraReducers(builder) {
    //fetchUsers
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload?.payload.users
      state.isLoading = false
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

export const { login, logout, searchUser, editProfile } = usersSlice.actions
export default usersSlice.reducer
