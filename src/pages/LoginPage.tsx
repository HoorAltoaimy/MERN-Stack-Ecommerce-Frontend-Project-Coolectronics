import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { fetchUsers, login } from '../redux/slices/users/userSlice'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const { users } = useSelector((state: RootState) => state.usersReducer)
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  console.log(users)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    try {
      const userFound = users.find(
        (userData) => userData.email === user.email && userData.password === user.password
      )
      if (userFound) {
        dispatch(login(userFound))
        if (userFound.role === 'admin') {
          navigate('/admin/adminDashboard')
        }
        if (userFound.role === 'visitor') {
          navigate('/visitor/visitorProfile')
        }
      } else {
        console.log('wrong info')
        toast('wrong info!')
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={user.email} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        <p>
          You do not have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
