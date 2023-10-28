import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux/store'

const Navbar = () => {
  const { isLoggedin, userData } = useSelector((state: RootState) => state.usersReducer)
  
  let userRole
  if (userData) {
  userRole = userData.role
  }
  
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isLoggedin && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          {isLoggedin && userRole === 'admin' && (
            <li>
              <Link to="/admin/adminDashboard">Admin Dashboard</Link>
            </li>
          )}
          {isLoggedin && userRole === 'user' && (
            <li>
              <Link to="/user/userProfile">User Profile</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
