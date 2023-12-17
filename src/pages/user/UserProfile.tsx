import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import useUsersState from '../../hooks/useUsersState'
import { editProfile } from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'

const UserProfile = () => {
  const { userData } = useUsersState()

  const [isFormOpen, setIsFormOpen] = useState(false)

  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
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
    const editUserData = { id: userData?.id, ...user }

    if (user.firstName && user.firstName.length < 2) {
      setValidation('First name should be at least 2 characters')
      return
    }
    if (user.lastName && user.lastName.length < 2) {
      setValidation('Last name should be at least 2 characters')
      return
    }

    dispatch(editProfile(editUserData))
    toast.success('Updated successfully')
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
            <div key={userData.id}>
              <p>User ID: {userData.id}</p>
              <p>First name: {userData.firstName}</p>
              <p>Last name: {userData.lastName}</p>
              <p>Email: {userData.email}</p>
              <button className="btn" onClick={handleFormOpen}>
                Edit
              </button>
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
