import { useNavigate, useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import { activateUser } from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import showToast from '../../utils/toastUtils'
import { useEffect } from 'react'
import useUsersState from '../../hooks/useUsersState'

interface DecodedToken {
  username: string
  email: string
  password: string
  image: string
  address: string
  phone: string
}

const Activate = () => {
  const { error } = useUsersState()

  const {token} = useParams()

  // Check if token is undefined before decoding
  const decoded: DecodedToken | null = token ? jwtDecode(token) : null

  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

    useEffect(() => {
      if (error) {
        showToast('error', error)
      }
    }, [error])

  const handleActivate = async () => {
    try {
      if (token) {

        const response = await dispatch(activateUser(token))

        if (response.meta.requestStatus === 'fulfilled') {
          showToast('success', 'New user created successfully')
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
