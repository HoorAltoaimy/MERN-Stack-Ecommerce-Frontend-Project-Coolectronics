import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

const VisitorProtectedRoutes = () => {
  const { isLoggedin, userData } = useSelector((state: RootState) => state.usersReducer)
  let visitor
  if (userData.role === 'visitor') {
    visitor = true
  } else {
    visitor = false
  }
  return isLoggedin && visitor ? <Outlet /> : <LoginPage />
}

export default VisitorProtectedRoutes
