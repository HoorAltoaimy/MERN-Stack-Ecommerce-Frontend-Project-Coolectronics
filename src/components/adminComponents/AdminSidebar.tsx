import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import useUserState from '../../hooks/useUsersState'

const AdminSidebar = () => {
  const { userData } = useUserState()

  return (
    <aside className="sidebar">
      <div className="admin-profile">
        <div className="admin-info">
          <ul className="admin-routes">
            <li>
              <Link to="/admin/adminDashboard">
                <h3>Admin Profile</h3>
              </Link>
            </li>
          </ul>
        </div>
        <div className="admin-info">
          <img src={userData?.image} alt={userData?.username} width={80} height={70} />
        </div>
        <div className="admin-info">
          <p>{userData?.username}</p>
        </div>
        <div className="admin-info">
          <p>{userData?.email}</p>
        </div>
      </div>

      <ul className="admin-routes">
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
