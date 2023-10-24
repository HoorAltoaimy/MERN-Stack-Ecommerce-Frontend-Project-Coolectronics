import AdminSidebar from './AdminSidebar'

const Products = () => {
  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <form>
          <input type="text" name="product" />
          <button>Create Product</button>
        </form>

        <h2>Products:</h2>
        {/*fetch all the products here*/}
        <div className="product">
          <p>
            productName <button>Edit</button> <button>Delete</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Products
