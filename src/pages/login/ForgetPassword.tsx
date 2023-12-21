import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { clearError, forgetPassword } from '../../redux/slices/users/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import useUsersState from '../../hooks/useUsersState'
import axios from 'axios'

const ForgetPassword = () => {
  const { error } = useUsersState()

  const [email, setEmail] = useState('')

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => dispatch(clearError()),
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  }, [error])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const response = await dispatch(forgetPassword(email))

      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('Check your email to reset ', {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message, {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      }
    }
  }

  return (
    <div className="user-body">
      <div className="login-div">
        <form className="user-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />

          <button className="btn" type="submit">
            Reset
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
