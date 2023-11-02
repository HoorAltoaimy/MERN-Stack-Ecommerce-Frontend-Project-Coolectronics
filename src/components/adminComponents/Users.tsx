import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../redux/store'
import { User, blockUser, deleteUser, searchUser } from '../../redux/slices/users/userSlice'

import AdminSidebar from './AdminSidebar'
import Search from '../Search'
import useUsersState from '../../hooks/useUsersState'

const Users = () => {
  const { users, isLoading, error, searchInput } = useUsersState()

  const dispatch: AppDispatch = useDispatch()

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchUser(searchItem))
  }

  const searchResult = searchInput
    ? users.filter((user) => user.firstName.toLowerCase().includes(searchInput.toLowerCase()))
    : users

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id))
  }

  const handleBlockUser = (id: number) => {
    dispatch(blockUser(id))
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
            <td>Name</td>
            <td>Email</td>
            <td>Delete User</td>
            <td>Block User</td>
          </thead>
          {searchResult.length > 0 &&
            searchResult.map((user: User) => {
              const { id, firstName, lastName, email, role, isBlocked } = user
              if (role !== 'admin') {
                return (
                  <tr key={id} className="users-card">
                    <td>{id}</td>
                    <td>
                      {firstName} {lastName}
                    </td>
                    <td>{email}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          handleDeleteUser(id)
                        }}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          handleBlockUser(id)
                        }}>
                        {isBlocked ? 'Unblock' : 'Block'}
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
