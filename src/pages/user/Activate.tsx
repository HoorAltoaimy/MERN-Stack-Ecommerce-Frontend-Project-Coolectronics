import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import { activateUser } from '../../services/userServices'

interface DecodedToken {
  username: string
  email: string
  password: string
  address: string
  phone: string
}

const Activate = () => {
  const { token } = useParams<{ token?: string }>()

  // Check if token is undefined before decoding
  const decoded: DecodedToken | null = token ? jwtDecode(token) : null

  const navigate = useNavigate()

  const handleActivate = async () => {
    try {
      if (token) {
        await activateUser(token)
        navigate('/login')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data.message)
      }
    }
  }

  return (
    //! css is required
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
