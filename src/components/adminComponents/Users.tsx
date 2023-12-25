import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import useUsersState from '../../hooks/useUsersState'
import {
  User,
  banUser,
  deleteUser,
  fetchUsers,
  grantRole,
  searchUser,
  unbanUser
} from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'

import Search from '../products/Search'
import AdminSidebar from './AdminSidebar'
import showToast from '../../utils/toastUtils'

const Users = () => {
  const { users, error, isLoading, searchInput } = useUsersState()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (error) {
      showToast('error', error)
    }
  }, [error])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchUser(searchItem))
  }

  const searchResult = searchInput
    ? users.filter((user) => user.username.toLowerCase().includes(searchInput.toLowerCase()))
    : users

  //! handle grant role here

  const handleDeleteUser = async (id: string | undefined) => {
    if (id) {
      try {
        const response = await dispatch(deleteUser(id))

        if (response.meta.requestStatus === 'fulfilled') {
          showToast('success', 'User deleted successfully')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast('error', error?.response?.data.message)
        }
      }
    }
  }

  const handleBanStatus = async (id: string | undefined, isBanned: boolean | undefined) => {
    if (id && isBanned) {
      try {
        const response = isBanned ? await dispatch(unbanUser(id)) : await dispatch(banUser(id))

        if (response.meta.requestStatus === 'fulfilled') {
          showToast('success', 'User ban status updated successfully')
        }
        if (response.meta.requestStatus === 'rejected') {
          showToast('error', 'Unable to update the ban status of this user')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast('error', error?.response?.data.message)
        }
      }
    }
  }

  const handleGrantRole = async (id: string | undefined) => {
    if (id) {
      try {
        const response = await dispatch(grantRole(id))

        if (response.meta.requestStatus === 'fulfilled') {
          showToast('success', 'User role updated successfully')
        }
        if (response.meta.requestStatus === 'rejected') {
          showToast('error', 'Unable to update the user role')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast('error', error?.response?.data.message)
        }
      }
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main-content">
        <h3 className="title">USERS</h3>

        <div className="search-div">
          <Search
            searchInput={searchInput}
            handleSearch={handleSearch}
            searchLabel="Search by User ID: "
          />
        </div>

        <table>
          <thead>
            <td>ID</td>
            <td>Image</td>
            <td>Name</td>
            <td>Email</td>
            <td>Delete User</td>
            <td>Block User</td>
            <td>Grant a role</td>
          </thead>
          {searchResult.length > 0 &&
            searchResult.map((user: User) => {
              const { _id, username, email, image, isAdmin, isBanned } = user
              if (!isAdmin) {
                return (
                  <tr key={_id} className="users-card">
                    <td>{_id}</td>
                    {/* <td>{<img src={`http://localhost:5050/${image}`} alt={username} width={50} height={50} />}</td> */}
                    <td>{<img src={image as string} alt={username} width={50} height={50} />}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          handleDeleteUser(_id)
                        }}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          handleBanStatus(_id, isBanned)
                        }}>
                        {isBanned ? 'Unban' : 'Ban'}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          handleGrantRole(_id)
                        }}>
                        Make an admin
                      </button>
                    </td>
                  </tr>
                )
              }
            })}
        </table>
      </div>
    </div>
  )
}

export default Users
