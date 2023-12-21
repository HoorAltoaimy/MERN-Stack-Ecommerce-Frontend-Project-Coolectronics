import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import useUsersState from '../../hooks/useUsersState'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { clearError, resetPassword } from '../../redux/slices/users/userSlice'

const ResetPassword = () => {
  const { error } = useUsersState()

  const [password, setPassword] = useState('')

  const { token } = useParams()

  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

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
    setPassword(value)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const response = await dispatch(resetPassword({ password, token }))

      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('Password reseted successfully', {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
        navigate('/login')
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
          <label htmlFor="email">Enter new password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
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

export default ResetPassword
