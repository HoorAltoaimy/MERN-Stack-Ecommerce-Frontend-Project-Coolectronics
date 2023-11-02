import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { AppDispatch } from '../redux/store'
import { Product, searchProduct } from '../redux/slices/products/productsSlice'
import { addToCart } from '../redux/slices/cart/cartSlice'

import SortProducts from '../components/SortProducts'
import Search from '../components/Search'
import useProductState from '../hooks/useProductsState'
import useCategoriesState from '../hooks/useCategoriesState'
import { prices } from '../prices'

const Home = () => {
  const { products, isLoading, error, searchInput } = useProductState()

  const { categories } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()

  const [selectedCategory, setSelectedCategory] = useState<number[]>([])

  const [priceRange, setPriceRange] = useState<number[]>([])

  const [currentPage, setCurrentPage] = useState(1)

  const [itemsPerPage] = useState(3)

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

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory.length > 0
        ? selectedCategory.some((id) => product.categories.includes(Number(id)))
        : product

    const priceMatch =
      priceRange.length > 0
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : product

    const searchResult =
      searchInput !== '' ? product.name.toLowerCase().includes(searchInput.toLowerCase()) : products

    return categoryMatch && priceMatch && searchResult
  })

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentItems = filteredProducts.slice(firstItemIndex, lastItemIndex)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button
        className="pagination"
        onClick={() => {
          handlePageChange(i)
        }}>
        {i}
      </button>
    )
  }


  const handleAddToCart = (product: Product) => {
    toast.clearWaitingQueue()
    toast.success('Added to cart successfully')
    dispatch(addToCart(product))
  }

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
          <h1>
            Your <mark>one-stop shop</mark> for all things electronics
          </h1>
          <h3>Shop the latest and greatest electronics from the top brands in the world</h3>
          <h3>Competitive prices & Wide selection of choices!</h3>
          <a href="#products-container">
            <h3>{`Shop our wide selection of electronics now >`}</h3>
          </a>
        </div>

        <img src="src/images/heroimg.jpg" alt="hero-section" />
      </div>

      <a className="hero-navigation" id="products-container">
        <h2>PRODUCTS</h2>
      </a>

      <div className="home-actions">
        <Search
          searchInput={searchInput}
          handleSearch={handleSearch}
          searchLabel={'Search product by name: '}
        />
        <SortProducts />

        <div className="filters">
          <div className="category-filter">
            <p>Filter by category: </p>
            <div>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <label htmlFor="category" key={category.id}>
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
                  )
                })}
            </div>
          </div>

          <div className="price-filter">
            <p>Filter by price: </p>
            <div>
              {prices.length > 0 &&
                prices.map((price) => {
                  return (
                    <label htmlFor="price" key={price.id}>
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
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="products-container">
        {currentItems.length > 0 &&
          currentItems.map((product: Product) => {
            const { id, name, image, description, price } = product
            return (
              <article className="product-card" key={id}>
                <img src={image} alt={name} width={200} height={200} />
                <p>{name}</p>
                <p>{description}</p>
                <p>${price}</p>
                <Link to={`/productDetails/${id}`}>Show more</Link>
                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      handleAddToCart(product)
                    }}>
                    Add to cart
                  </button>
                  <ToastContainer limit={1} autoClose={3000} position={toast.POSITION.TOP_CENTER} />
                </div>
              </article>
            )
          })}
      </div>

      <div className="pagination-div">
        <button className="pagination" onClick={handlePrevious} disabled={currentPage === 1}>
          <FaArrowLeft />
        </button>

        {pageNumbers}

        <button className="pagination" onClick={handleNext} disabled={currentPage === totalPages}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Home
