import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import useUserState from '../../hooks/useUsersState'
import { AppDispatch } from '../../redux/store'
import AdminSidebar from '../../components/adminComponents/AdminSidebar'
import { updateAdminProfile } from '../../redux/slices/users/userSlice'
import showToast from '../../utils/toastUtils'
import axios from 'axios'

const AdminDashboard = () => {
  const { userData } = useUserState()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [user, setUser] = useState({
    username: userData?.username || '',
    email: userData?.email || '',
    image: userData?.image || ''
  })

  const [validation, setValidation] = useState('')

  const dispatch: AppDispatch = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = event.target
    if (type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      const file = fileInput.files?.[0]
      setUser((prevUsers) => {
        return { ...prevUsers, [name]: file }
      })
    } else {
      setUser((prevUsers) => {
        return { ...prevUsers, [name]: value }
      })
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    try {
      if (user.username && user.username.length < 3) {
        setValidation('Username should be at least 3 characters')
        return
      }
      if (user.email && user.email.length < 10) {
        setValidation('Pleas provide a valid email')
        return
      }

      const editAdminData = new FormData()
      editAdminData.append('username', user.username)
      editAdminData.append('email', user.email)
      editAdminData.append('image', user.image)

      for (const [key, value] of editAdminData) {
        console.log(key, value)
      }

      if (userData) {
        dispatch(updateAdminProfile({ updatedAdmin: editAdminData, id: userData?._id }))
        showToast('success', 'Updated successfully')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast('error', error?.response?.data.message)
      }
    }
  }

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main-content">
        <div className="admin-info">
          <img src={userData?.image} alt={userData?.username} width={100} height={90} />
        </div>
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

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="image">Image:</label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
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
