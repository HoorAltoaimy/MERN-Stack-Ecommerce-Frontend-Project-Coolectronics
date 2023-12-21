import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'

import useUsersState from '../../hooks/useUsersState'
import {
  User,
  banUser,
  clearError,
  deleteUser,
  fetchUsers,
  searchUser,
  unbanUser
} from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'

import Search from '../products/Search'
import AdminSidebar from './AdminSidebar'

const Users = () => {
  const { users, error, searchInput } = useUsersState()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => dispatch(clearError()),
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
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

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await dispatch(deleteUser(id))

      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('User deleted successfully', {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message, {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      }
    }
  }

  const handleBanStatus = async (id: string, isBanned: boolean) => {
    try {
      const response = isBanned ? await dispatch(unbanUser(id)) : await dispatch(banUser(id))

      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('User ban status updated successfully', {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      }
      if (response.meta.requestStatus === 'rejected') {
        toast.error('Unable to update the ban status of this user', {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message)
      }
    }
  }

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
  // if (error) {
  //   return <p>{error}</p>
  // }

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
          </thead>
          {searchResult.length > 0 &&
            searchResult.map((user: User) => {
              const { _id, username, email, image, isAdmin, isBanned } = user
              if (!isAdmin) {
                return (
                  <tr key={_id} className="users-card">
                    <td>{_id}</td>
                    {/* <td>{<img src={`http://localhost:5050/${image}`} alt={username} width={50} height={50} />}</td> */}
                    <td>{<img src={image} alt={username} width={50} height={50} />}</td>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{isBanned}</td>
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
