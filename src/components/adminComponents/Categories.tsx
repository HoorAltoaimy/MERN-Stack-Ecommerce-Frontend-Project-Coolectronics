import AdminSidebar from './AdminSidebar'

const Categories = () => {
  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <form>
          <input type="text" name="category" />
          <button>Create Category</button>
        </form>

        <h2>Categories:</h2>
        {/*fetch all the categories here*/}
        <div className="category">
          <p>
            categoryName <button>Edit</button> <button>Delete</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Categories
