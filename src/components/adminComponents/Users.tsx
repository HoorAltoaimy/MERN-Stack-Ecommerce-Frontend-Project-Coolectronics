import AdminSidebar from './AdminSidebar'

const Users = () => {
  return (
    <div className="container">
      <AdminSidebar />
      {/*fetch all the users here*/}
      <div className="main-content">
        <p>userName <button>Delete</button></p>
      </div>
    </div>
  )
}

export default Users
