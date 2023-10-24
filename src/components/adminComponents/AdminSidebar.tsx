import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="admin-profile">
        <h3>Admin Profile</h3>
        <FaUser />
        <p>admin name</p>
      </div>

      <ul>
        <li>
          <Link to="/adminDashboard/categories">Categories</Link>
        </li>
        <li>
          <Link to="/adminDashboard/products">Products </Link>
        </li>
        <li>
          <Link to="/adminDashboard/orders">Orders </Link>
        </li>
        <li>
          <Link to="/adminDashboard/users">Users </Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
