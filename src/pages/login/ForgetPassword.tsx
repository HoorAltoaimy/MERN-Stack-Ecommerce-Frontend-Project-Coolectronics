import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import useUsersState from '../../hooks/useUsersState'
import showToast from '../../utils/toastUtils'
import { forgetPassword } from '../../redux/slices/users/userSlice'

const ForgetPassword = () => {
  const { error } = useUsersState()

  const [email, setEmail] = useState('')

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (error) {
     showToast('error', error)
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
        showToast('success', 'Check your email to reset')
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
