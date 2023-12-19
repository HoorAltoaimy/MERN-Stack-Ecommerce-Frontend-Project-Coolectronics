import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { RootState } from '../redux/store'

import LoginPage from '../pages/login/LoginPage'

const AdminProtectedRoutes = () => {
  const { isLoggedin, userData } = useSelector((state: RootState) => state.usersReducer)

  return isLoggedin && userData?.isAdmin ? <Outlet /> : <LoginPage pathName=''/>
}

export default AdminProtectedRoutes
