import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect } from 'react'
import { Product, fetchProducts } from '../redux/slices/products/productsSlice'

const Home = () => {
  const { products, isLoading, error } = useSelector((state: RootState) => state.productsReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="home-container">
      <h2>Home page</h2>
      <h3>Products</h3>
      <div className="home-products">
        {products.length > 0 &&
          products.map((product: Product) => {
            const { id, name, image, description, categories, variants, sizes } = product
            return (
              <article key={id} className="product-ard">
                <img src={image} alt={name} width={200} height={200} />
                <p>{name}</p>
                <p>{description}</p>
                <p>{categories}</p>
                <p>{variants}</p>
                <p>{sizes}</p>
                <button>Add to cart</button>
              </article>
            )
          })}
      </div>
    </div>
  )
}

export default Home
