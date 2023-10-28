import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { ChangeEvent, useEffect } from 'react'
import { Product, fetchProducts, searchProduct } from '../redux/slices/products/productsSlice'
import { Link } from 'react-router-dom'
import SortProducts from '../components/SortProducts'
import Search from '../components/Search'
import useProductState from '../hooks/useProductState'

const Home = () => {
  const { products, isLoading, error, searchInput } = useProductState()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchProduct(searchItem))
  }

  const searchResult = searchInput
    ? products.filter((product) => product.name.toLowerCase().includes(searchInput.toLowerCase()))
    : products

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="home-container">
      <h3>Products</h3>
      {/* <form>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search.."
          onChange={handleSearch}
          value={searchInput}
        />
      </form> */}
      <Search searchInput={searchInput} handleSearch={handleSearch} />
      <div className="actions">
        <SortProducts />
        <h4>filter by price: </h4>
        <h4>filter by category: </h4>
        <div className="home-products">
          {searchResult.length > 0 &&
            searchResult.map((product: Product) => {
              const { id, name, image, description, price } = product
              return (
                <article key={id} className="product-ard">
                  <img src={image} alt={name} width={200} height={200} />
                  <p>{name}</p>
                  <p>{description}</p>
                  <p>{price} SAR</p>
                  <Link to={`/productDetails/${id}`}>Show more</Link>
                  <button>Add to cart</button>
                </article>
              )
            })}
        </div>
      Se</div>
    </div>
  )
}

export default Home
