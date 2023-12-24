import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import useUsersState from '../../hooks/useUsersState'
import { AppDispatch } from '../../redux/store'
import { loginUser } from '../../redux/slices/users/userSlice'
import showToast from '../../utils/toastUtils'

const LoginPage = ({ pathName = '' }: { pathName: string }) => {
  const { userData, error } = useUsersState()

  const navigate = useNavigate()

  const [user, setUser] = useState({ email: '', password: '' })

  const dispatch: AppDispatch = useDispatch()

  //! problem
  useEffect(() => {
    if (error) {
      showToast('error', error)
    }
  }, [error])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  useEffect(() => {
    if (userData) {
      navigate(
        pathName
          ? pathName
          : `${userData && userData.isAdmin ? '/admin/adminDashboard' : '/user/userProfile'}`
      )
    }
  }, [userData, navigate, pathName])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    try {
      dispatch(loginUser(user))
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button className="btn" type="submit">
            Login
          </button>

          <p>
            Forgot your password? <Link to="/users/forget-password">Reset</Link>
          </p>
          <p>
            Do not have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
