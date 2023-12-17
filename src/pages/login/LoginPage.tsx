import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import useUsersState from '../../hooks/useUsersState'
import { login } from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'

const LoginPage = () => {
  const { users } = useUsersState()

  const navigate = useNavigate()

  const [user, setUser] = useState({ email: '', password: '' })

  const dispatch: AppDispatch = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    try {
      const userFound = users.find(
        (userData) => userData.email === user.email && userData.password === user.password
      )

      if (!userFound) {
        toast.error('Wrong email or password')
        setUser({
          email: '',
          password: ''
        })
        return
      }
      if (userFound.isBlocked) {
        toast.error('You are blocked!')
        setUser({
          email: '',
          password: ''
        })
        return
      }
      if (userFound) {
        dispatch(login(userFound))
        if (userFound.role === 'admin') {
          navigate('/admin/adminDashboard')
        }
        if (userFound.role === 'user') {
          navigate('/user/userProfile')
        }
      }
    } catch (error) {
      console.log(error)
    }

    setUser({
      email: '',
      password: ''
    })
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
            Do not have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
