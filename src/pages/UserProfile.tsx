import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { editProfile, logout } from '../redux/slices/users/userSlice'
import { useNavigate } from 'react-router-dom'
import useUserState from '../hooks/useUserState'
import { ChangeEvent, FormEvent, useState } from 'react'

const UserProfile = () => {
  const { userData } = useUserState()

  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => {
      return { ...prevUser, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const editUserData = { id: userData?.id, ...user }
    dispatch(editProfile(editUserData))
  }

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <h3>User profile</h3>
      {userData && (
        <div>
          <div key={userData.id}>
            <p>User ID: {userData.id}</p>
            <p>First name: {userData.firstName}</p>
            <p>Last name: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
            <button onClick={handleFormOpen}>Edit</button>
          </div>

          <div>
            {isFormOpen && (
              <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name: </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name: </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
                <button type="submit">Save</button>
              </form>
            )}
          </div>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserProfile
