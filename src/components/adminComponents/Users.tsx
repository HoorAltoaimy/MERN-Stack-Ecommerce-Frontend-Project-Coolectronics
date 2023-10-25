import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect } from 'react'
import { User, fetchUsers } from '../../redux/slices/users/userSlice'

const Users = () => {
  const { users, isLoading, error } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h3>Users</h3>
        <div className="admin-main-content">
          {users.length > 0 &&
            users.map((user: User) => {
              const { id, firstName, lastName, email, password, role } = user
              return (
                <article key={id}>
                  <p>user id: {id}</p>
                  <p>
                    name: {firstName} {lastName}{' '}
                  </p>
                  <p>email: {email}</p>
                  <p>password: {password}</p>
                  <p>role: {role}</p>
                  <button>Delete</button>
                  <button>Block</button>
                </article>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Users
