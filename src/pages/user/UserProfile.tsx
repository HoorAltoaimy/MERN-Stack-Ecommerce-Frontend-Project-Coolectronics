import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import useUsersState from '../../hooks/useUsersState'
import { AppDispatch } from '../../redux/store'
import { updateUserProfile } from '../../redux/slices/users/userSlice'
import showToast from '../../utils/toastUtils'

const UserProfile = () => {
  const { userData, error } = useUsersState()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [user, setUser] = useState({
    username: userData?.username || '',
    email: userData?.email || '',
    image: userData?.image || '',
    phone: userData?.phone || '',
    address: userData?.address || ''
  })

  const [validation, setValidation] = useState('')

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (error) {
      showToast('error', error)
    }
  }, [error])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (user.phone && user.phone.length < 10) {
        setValidation('Phone should 10 numbers')
        return
      }
      if (user.address && user.address.length < 4) {
        setValidation('Address should be at least 4 characters')
        return
      }

      const editUserData = new FormData()
      editUserData.append('username', user.username)
      editUserData.append('email', user.email)
      editUserData.append('image', user.image)
      editUserData.append('phone', user.phone)
      editUserData.append('address', user.address)

      if (userData) {
        dispatch(updateUserProfile({ updatedUser: editUserData, id: userData?._id }))
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
    <div className="user-body">
      <div className="user-div">
        <h3 className="title">USER PROFILE</h3>
        {userData && (
          <div className="user-form">
            <div key={userData._id}>
              <img src={userData.image} alt={userData.username} width={100} height={90} />
              <p>User ID: {userData._id}</p>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <p>Phone: {userData.phone}</p>
              <p>Address: {userData.address}</p>
              <button className="btn" onClick={handleFormOpen}>
                Edit
              </button>
            </div>

            <div>
              {isFormOpen && (
                <form className="user-form" onSubmit={handleSubmit}>
                  <label htmlFor="username">Username:</label>
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

                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={user.phone}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="address">address:</label>
                  <textarea
                    name="address"
                    id="address"
                    value={user.address}
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
        )}
      </div>
    </div>
  )
}

export default UserProfile
