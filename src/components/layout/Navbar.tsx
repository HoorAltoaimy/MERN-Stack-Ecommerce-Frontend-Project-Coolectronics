import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux/store'

const Navbar = () => {
  const { isLoggedin, userData } = useSelector((state: RootState) => state.usersReducer)

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {isLoggedin && userData.role === 'admin' && (
            <li>
              <Link to="/admin/adminDashboard">Admin Dashboard</Link>
            </li>
          )}
          {isLoggedin && userData.role === 'visitor' && (
            <li>
              <Link to="/visitor/visitorProfile">Visitor Profile</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
