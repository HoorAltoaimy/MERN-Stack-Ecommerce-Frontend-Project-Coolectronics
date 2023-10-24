import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/adminDashboard">Admin Dashboard</Link>
          </li>
          <li>
            <Link to="/user">User Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
