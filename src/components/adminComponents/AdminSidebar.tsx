import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/users/userSlice'

const AdminSidebar = () => {

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleClick = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="admin-profile">
        <h3>Admin Profile</h3>
        <FaUser />
        <p>admin name</p>
        <button onClick={handleClick}>logout</button>
      </div>

      <ul>
        <li>
          <Link to="/admin/adminDashboard/categories">Categories</Link>
        </li>
        <li>
          <Link to="/admin/adminDashboard/products">Products </Link>
        </li>
        <li>
          <Link to="/admin/adminDashboard/orders">Orders </Link>
        </li>
        <li>
          <Link to="/admin/adminDashboard/users">Users </Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
