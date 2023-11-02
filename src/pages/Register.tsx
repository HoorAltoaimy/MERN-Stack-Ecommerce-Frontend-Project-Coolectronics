import { useNavigate } from "react-router-dom"
import { AppDispatch } from "../redux/store"
import { useDispatch } from "react-redux"
import { ChangeEvent, FormEvent, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { addUser, fetchUsers } from "../redux/slices/users/userSlice";
// import useUsersState from "../hooks/useUsersState";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Register = () => {
    // const { users } = useUsersState()

  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    isBlocked: false
  })
  const [validation, setValidation] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setUser((prevUsers) => {
      return { ...prevUsers, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newUser = { id: uuidv4(), ...user }
    
    if (user.firstName.length < 2) {
      setValidation('First name should be at least 2 characters')
      return
    }
    if (user.lastName.length < 2) {
      setValidation('Last name should be at least 2 characters')
      return
    }
    if (user.email.length < 10) {
      setValidation('Pleas provide a valid email')
      return
    }
    if (user.password.length < 6) {
      setValidation('Password should be at least 6 characters')
      return
    }
    
    dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))
    toast.success('Registered successfully')
    navigate('/login')
  }
  
  return (
    <div className="user-body">
      <div className="login-div">
        <form className="user-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />

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

          <p className="form-validation">{validation}</p>

          <button className="btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
