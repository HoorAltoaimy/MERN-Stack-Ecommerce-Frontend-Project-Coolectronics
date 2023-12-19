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
    username: userData?.username
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
    const editUserData = { id: userData?._id, ...user }

    if (user.username && user.username.length < 3) {
      setValidation('Username should be at least 3 characters')
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
            <div key={userData._id}>
              <p>User ID: {userData._id}</p>
              <p>Username: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <button className="btn" onClick={handleFormOpen}>
                Edit
              </button>
            </div>

            <div>
              {isFormOpen && (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="firstName">Userame: </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={user.username}
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
