import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { logout } from '../../redux/slices/users/userSlice'
import CartIcon from '../userComponents/CartIcon'
import useUsersState from '../../hooks/useUsersState'

const Navbar = () => {
  const { isLoggedin, userData } = useUsersState()
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  let userRole
  if (userData) {
    userRole = userData.role
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src="src/images/logo.png" alt="logo" width={200} />
        </div>

        <div className="navlist">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

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

            <li>
              <Link to="/cart">
                <CartIcon value={cartItems.length > 0 ? cartItems.length : 0} />
              </Link>
            </li>
          </ul>
        </div>

        <div className="navoptions">
          {!isLoggedin ? (
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          ) : (
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
