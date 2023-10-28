import { useDispatch } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch } from '../../redux/store'
import { ChangeEvent, useEffect } from 'react'
import {
  User,
  blockUser,
  deleteUser,
  fetchUsers,
  searchUser
} from '../../redux/slices/users/userSlice'
import Search from '../Search'
import useUserState from '../../hooks/useUserState'

const Users = () => {
  const { users, isLoading, error, searchInput } = useUserState()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

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
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h3>Users</h3>
        <Search searchInput={searchInput} handleSearch={handleSearch} />
        <div className="admin-main-content">
          {searchResult.length > 0 &&
            searchResult.map((user: User) => {
              const { id, firstName, lastName, email, password, role, isBlocked } = user
              if (role !== 'admin') {
                return (
                  <article key={id} className="users-card">
                    <p>user id: {id}</p>
                    <p>
                      name: {firstName} {lastName}{' '}
                    </p>
                    <p>email: {email}</p>
                    <p>password: {password}</p>
                    <p>role: {role}</p>
                    <button
                      onClick={() => {
                        handleDeleteUser(id)
                      }}>
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        handleBlockUser(id)
                      }}>
                      {isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </article>
                )
              }
            })}
        </div>
      </div>
    </div>
  )
}

export default Users
