import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { RootState } from '../redux/store'

import LoginPage from '../pages/login/LoginPage'

const AdminProtectedRoutes = () => {
  const { isLoggedin, userData } = useSelector((state: RootState) => state.usersReducer)
  let admin
  if (userData?.role === 'admin') {
    admin = true
  } else {
    admin = false
  }
  return isLoggedin && admin ? <Outlet /> : <LoginPage />
}

export default AdminProtectedRoutes
