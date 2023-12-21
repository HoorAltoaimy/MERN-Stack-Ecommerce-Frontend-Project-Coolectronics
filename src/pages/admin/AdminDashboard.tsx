import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import useUserState from '../../hooks/useUsersState'
import { AppDispatch } from '../../redux/store'
import AdminSidebar from '../../components/adminComponents/AdminSidebar'
import { updateUserProfile } from '../../redux/slices/users/userSlice'
import showToast from '../../utils/toastUtils'

const AdminDashboard = () => {
  const { userData } = useUserState()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [user, setUser] = useState({
    username: userData?.username || ''
  })

  const [validation, setValidation] = useState('')

  const dispatch: AppDispatch = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => {
      return { ...prevUser, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const editUserData = { _id: userData?._id || '', ...user }

    if (user.username && user.username.length < 3) {
      setValidation('Username should be at least 3 characters')
      return
    }

    dispatch(updateUserProfile(editUserData))
    showToast('success', 'Updated successfully')
  }

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main-content">
        <div className="admin-info">
          <p>ID: {userData?._id}</p>
        </div>
        <div className="admin-info">
          <p>Username: {userData?.username}</p>
        </div>
        <div className="admin-info">
          <p>Email: {userData?.email}</p>
        </div>
        <button className="btn" onClick={handleFormOpen}>
          Edit
        </button>

        <div>
          {isFormOpen && (
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={handleChange}
                required
              />
              <p className="form-validation">{validation}</p>

              <button className="btn" type="submit">
                Save
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
