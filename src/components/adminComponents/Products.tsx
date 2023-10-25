import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { Product, fetchProducts } from '../../redux/slices/products/productsSlice';

const Products = () => {

  const { products, isLoading, error } = useSelector((state: RootState) => state.productsReducer)

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
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
        <form>
          <h3>Create Product</h3>
          {/*add more input fields to input all the product's info*/}
          <label htmlFor="product-name">Product name:</label>
          <input type="text" name="product-name" />
          <label htmlFor="product-descripton">Product descripton:</label>
          <input type="text" name="product-descripton" />
          <button>Create</button>
        </form>

        <h3>Products:</h3>
        <div className="admin-main-content">
          {products.length > 0 &&
            products.map((product: Product) => {
              const { id, name, image } = product
              return (
                <article key={id} className="admin-products">
                  <img src={image} alt={name} width={100} height={100} />
                  <p>{name}</p>
                  {/* <p>{description}</p>
                  <p>{categories}</p>
                  <p>{variants}</p>
                  <p>{sizes}</p> */}
                  <button>Edit</button>
                  <button>Delete</button>
                </article>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Products
