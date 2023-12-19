import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import useUsersState from '../../hooks/useUsersState'
import { logoutUser } from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'

import CartIcon from '../userComponents/CartIcon'
import useCartState from '../../hooks/useCartState'

const Navbar = () => {
  const { isLoggedin, userData } = useUsersState()

  const { cartItems } = useCartState()

  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
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

            {/* {isLoggedin && userData?.isAdmin && (
              <li>
                <Link to="/admin/adminDashboard">Admin Dashboard</Link>
              </li>
            )}
            {isLoggedin && !userData?.isAdmin && (
              <li>
                <Link to="/user/userProfile">User Profile</Link>
              </li>
            )} */}

            {isLoggedin && (
              <>
                <li>
                  <Link
                    to={`${
                      userData && userData.isAdmin ? '/admin/adminDashboard' : '/user/userProfile'
                    }`}>
                    {userData && userData.isAdmin ? 'Admin Dashboard' : 'User profile'}
                  </Link>
                </li>
              </>
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
