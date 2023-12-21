import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import useUsersState from '../../hooks/useUsersState'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../redux/slices/users/userSlice'
import showToast from '../../utils/toastUtils'

const ResetPassword = () => {
  const { error } = useUsersState()

  const [password, setPassword] = useState('')

  const { token } = useParams()

  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      showToast('error', error)
    }
  }, [error])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPassword(value)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      if (token) {
        const response = await dispatch(resetPassword({ password, token }))

        if (response.meta.requestStatus === 'fulfilled') {
          showToast('success', 'Password reseted successfully')
          navigate('/login')
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast('error', error?.response?.data.message)
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
