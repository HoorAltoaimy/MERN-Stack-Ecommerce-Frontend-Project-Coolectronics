import { ChangeEvent, FormEvent, useState } from 'react'
//import { useDispatch } from 'react-redux'
//import { useNavigate } from 'react-router-dom'
//import { toast } from 'react-toastify'
//import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import { createUser } from '../../services/userServices'

//import { AppDispatch } from '../../redux/store'

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    image: '',
    phone: '',
    address: ''
  })

  const [validation, setValidation] = useState('')

  //const dispatch: AppDispatch = useDispatch()

  //const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      const [ name ] = event.target.name
      setUser((prevUsers) => {
        return { ...prevUsers, [name]: fileInput.files?.[0].name }
      })
    }
    else {
      const { name, value } = event.target
      setUser((prevUsers) => {
        return { ...prevUsers, [name]: value }
      })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('username', user.username)
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('image', user.image)
    formData.append('phone', user.phone)
    formData.append('address', user.address)

    if (user.username.length < 2) {
      setValidation('Username should be at least 2 characters')
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
    if (user.phone.length < 10) {
      setValidation('Phone should 10 numbers')
      return
    }
    if (user.phone.length < 4) {
      setValidation('Address should be at least 4 characters')
      return
    }

    try {
      await createUser(formData)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data.message)
      }
    }
  }

  return (
    <div className="user-body">
      <div className="login-div">
        <form className="user-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={user.username}
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

          <label htmlFor="image">Image:</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">address:</label>
          <textarea
            name="address"
            id="address"
            value={user.address}
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
