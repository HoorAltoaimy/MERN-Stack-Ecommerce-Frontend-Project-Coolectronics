import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { toast } from 'react-toastify'

import { activateUser } from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'

interface DecodedToken {
  username: string
  email: string
  password: string
  image: string
  address: string
  phone: string
}

const Activate = () => {
  const {token} = useParams()

  // Check if token is undefined before decoding
  const decoded: DecodedToken | null = token ? jwtDecode(token) : null

  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  const handleActivate = async () => {
    try {
      if (token) {

        const response = await dispatch(activateUser(token))

        if (response.meta.requestStatus === 'fulfilled') {
          toast.success('New user created successfully', {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
          navigate('/login')
        }
        if (response.meta.requestStatus === 'rejected') {
          toast.error('Unable to create new user', {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
        }
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
        {decoded ? (
          <>
            <h3>Hello {decoded.username}</h3>
            <h3>Click the button to activate your account</h3>
            <button onClick={handleActivate}>Activate</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default Activate
