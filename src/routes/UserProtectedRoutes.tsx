import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

const UserProtectedRoutes = () => {
  const { isLoggedin, userData } = useSelector((state: RootState) => state.usersReducer)
  let user
  if (userData && userData.role === 'user') {
    user = true
  } else {
    user = false
  }
  return isLoggedin && user ? <Outlet /> : <LoginPage />
}

export default UserProtectedRoutes
