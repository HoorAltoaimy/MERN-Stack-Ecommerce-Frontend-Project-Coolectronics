import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { ChangeEvent, useState } from 'react'
import { Product, searchProduct } from '../redux/slices/products/productsSlice'
import { Link } from 'react-router-dom'
import SortProducts from '../components/SortProducts'
import Search from '../components/Search'
import useProductState from '../hooks/useProductsState'
import { HiChevronRight } from 'react-icons/hi'
import useCategoriesState from '../hooks/useCategoriesState'
import { prices } from '../prices'

const Home = () => {
  const { products, isLoading, error, searchInput } = useProductState()
  const { categories } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()

  const [selectedCategory, setSelectedCategory] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([])
  
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchProduct(searchItem))
  }

  const handleSelectedCategory = (categoryId: number) => {
    if (selectedCategory.includes(categoryId)) {
      const filteredCategories = selectedCategory.filter((category) => category !== categoryId)
      setSelectedCategory(filteredCategories)
    } else {
      setSelectedCategory((prevState) => {
        return [...prevState, categoryId]
      })
    }
  }

  const handleSelectedPrice = (priceId: number) => {
    const selectedPriceRange = prices.find((price) => price.id === priceId)
    if (selectedPriceRange) {
      setPriceRange(selectedPriceRange.range)
    }
  }

  const actionsResult = products.filter((product) => {
    const categoryMatch =
      selectedCategory.length > 0
        ? selectedCategory.some((id) => product.categories.includes(Number(id)))
        : product
    
    const priceMatch =
      priceRange.length > 0
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : product
    
    const searchResult = searchInput !== ''
        ? product.name.toLowerCase().includes(searchInput.toLowerCase())
      : products
    
    return categoryMatch && priceMatch && searchResult
  })


  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Your one-stop shop for all things electronics</h1>
          <h3>Shop the latest and greatest electronics from the top brands in the world</h3>
          <h4>Competitive prices & Wide selection of choices!</h4>
          <a href="#products-container">{`Shop our wide selection of electronics now >`}</a>
        </div>

        <img src="src/images/heroimg3.jpg" alt="hero-section" width={1000} height={1000} />
      </div>

      <a className="hero-navigation" id="products-container">
        <h2 className="title">PRODUCTS</h2>
      </a>

      <div className="home-actions">
        <Search searchInput={searchInput} handleSearch={handleSearch} />
        <SortProducts />
        <p>Filter by price: </p>
        <div>
          {prices.length > 0 &&
            prices.map((price) => {
              return (
                <div key={price.id}>
                  <label htmlFor="price">
                    <input
                      type="radio"
                      name="price"
                      value={price.id}
                      onChange={() => {
                        handleSelectedPrice(price.id)
                      }}
                    />
                    {price.name}
                  </label>
                </div>
              )
            })}
        </div>

        <p>Filter by category: </p>
        <div>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <div key={category.id}>
                  <label htmlFor="category">
                    <input
                      type="checkbox"
                      name="category"
                      value={category.name}
                      onChange={() => {
                        handleSelectedCategory(category.id)
                      }}
                    />
                    {category.name}
                  </label>
                </div>
              )
            })}
        </div>
      </div>

      <div className="products-container">
        {actionsResult.length > 0 &&
          actionsResult.map((product: Product) => {
            const { id, name, image, description, price } = product
            return (
              <article className="product-card" key={id}>
                <img src={image} alt={name} width={200} height={200} />
                <p>{name}</p>
                <p>{description}</p>
                <p>${price}</p>
                <Link to={`/productDetails/${id}`}>Show more</Link>
                <div>
                  <button className="btn">Add to cart</button>
                </div>
              </article>
            )
          })}
      </div>
    </div>
  )
}

export default Home
