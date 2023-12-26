import { ChangeEvent, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToCart } from '../../redux/slices/cart/cartSlice'
import {
  Product,
  fetchProducts,
  filterProducts,
  searchProduct
} from '../../redux/slices/products/productsSlice'
import { AppDispatch } from '../../redux/store'

import Search from '../../components/products/Search'
import SortProducts from '../../components/products/SortProducts'
import useCategoriesState from '../../hooks/useCategoriesState'
import useProductState from '../../hooks/useProductsState'
import { prices } from '../../../public/mock/priceData/prices'
import { fetchCategories } from '../../redux/slices/categories/categoriesSlice'
import showToast from '../../utils/toastUtils'
// import { Category } from '../../redux/slices/categories/categoriesSlice'
// import { fetchCategories } from '../../redux/slices/categories/categoriesSlice'

const Home = () => {
  const { products, searchInput, pagination } = useProductState()

  const { categories } = useCategoriesState()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const [priceRange, setPriceRange] = useState<number[]>([])

  const [currentPage, setCurrentPage] = useState(1)

  const [itemsPerPage] = useState(3)

  const dispatch: AppDispatch = useDispatch()

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchProduct(searchItem))
  }

  const fetchData = async () => {
    await dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }))
    await dispatch(fetchCategories())
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, itemsPerPage])

  const fetchFilteredData = async () => {
    await dispatch(
      filterProducts({
        page: currentPage,
        limit: itemsPerPage,
        selectedCategories: selectedCategories,
        priceRange: priceRange
      })
    )
  }

  useEffect(() => {
    fetchFilteredData()
  }, [selectedCategories, priceRange])

  //Filter by category and price functionality
  const handleSelectedCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      const filteredCategories = selectedCategories.filter((category) => category !== categoryId)
      setSelectedCategories(filteredCategories)
    } else {
      setSelectedCategories((prevState) => {
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

  const searchResult = searchInput
    ? products.filter((product) => product.title.toLowerCase().includes(searchInput.toLowerCase()))
    : products

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const pageNumbers = []
  for (let i = 1; i <= pagination.totalPages; i++) {
    pageNumbers.push(
      <button
        className="pagination"
        key={i}
        onClick={() => {
          handlePageChange(i)
        }}>
        {i}
      </button>
    )
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    showToast('success', 'Added to cart successfully')
  }

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
  // if (error) {
  //   return <p>{error}</p>
  // }

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
                    <label htmlFor="category" key={category._id}>
                      <input
                        type="checkbox"
                        name="category"
                        value={category.title}
                        onChange={() => {
                          handleSelectedCategory(category._id)
                        }}
                      />
                      {category.title}
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
        {searchResult.length > 0 &&
          searchResult.map((product: Product) => {
            const { _id, title, slug, image, description, price } = product
            return (
              <article className="product-card" key={_id}>
                <img src={image as string} alt={title} width={200} height={200} />
                <p>{title}</p>
                <p>{description}</p>
                <p>${price}</p>
                <Link to={`/productDetails/${slug}`}>Show more</Link>
                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      handleAddToCart(product)
                    }}>
                    Add to cart
                  </button>
                </div>
              </article>
            )
          })}
      </div>

      <div className="pagination-div">
        <button className="pagination" onClick={handlePreviousPage} disabled={currentPage === 1}>
          <FaArrowLeft />
        </button>

        {pageNumbers}

        <button
          className="pagination"
          onClick={handleNextPage}
          disabled={currentPage === pagination.totalPages}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Home
