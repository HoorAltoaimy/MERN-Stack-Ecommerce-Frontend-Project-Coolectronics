import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { ChangeEvent, FormEvent, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { addUser, fetchUsers } from "../redux/slices/users/userSlice";


const Register = () => {
    const { users } = useSelector((state: RootState) => state.usersReducer)

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setUser((prevUsers) => {
      return { ...prevUsers, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const newUser = { id: uuidv4(), ...user }
    
    dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))
    navigate('/login')
    console.log(users) //1 issue: not adding the new user to the users array
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">firstName</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={user.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">lastName</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={user.lastName}
          onChange={handleChange}
        />

        <label htmlFor="email">email</label>
        <input type="text" name="email" id="email" value={user.email} onChange={handleChange} />

        <label htmlFor="password">password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register