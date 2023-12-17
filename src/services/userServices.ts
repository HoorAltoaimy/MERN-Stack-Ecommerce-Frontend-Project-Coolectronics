import axios from 'axios'
import { toast } from 'react-toastify'

export const baseURL = 'http://localhost:5050/api'

export const createUser = async (newUser: FormData) => {
  try {
    const response = await axios.post(`${baseURL}/users/process-register`, newUser)
    if (!response) {
      throw new Error('Network erroe')
    }
    toast.success('Check your email for activation')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message)
      console.log(error.response?.data.message)
    }
  }
}

export const activateUser = async (token: string) => {
    try {
      console.log(token);
    const response = await axios.post(`${baseURL}/users/activate`, {token})
    if (!response) {
      throw new Error('Network erroe')
    }
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response)
    }
  }
}

// export const deleteUser = async (id: string) => {
//   try {
//     const response = await axios.delete(`${baseURL}/users/${id}`)
//     if (!response) {
//       throw new Error('Network erroe')
//     }
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const banUser = async (id: string) => {
//   try {
//     const response = await axios.put(`${baseURL}/users/ban/${id}`)
//     if (!response) {
//       throw new Error('Network erroe')
//     }
//     return response.data
//   } catch (error) {
//     toast.error('Unable to updat ban status')
//     console.log(error)
//   }
// }

// export const unbanUser = async (id: string) => {
//   try {
//     const response = await axios.put(`${baseURL}/users/unban/${id}`)
//     if (!response) {
//       throw new Error('Network erroe')
//     }
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// }
