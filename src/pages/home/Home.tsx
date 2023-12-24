import { ChangeEvent, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { addToCart } from '../../redux/slices/cart/cartSlice'
import { Product, fetchProducts, searchProduct } from '../../redux/slices/products/productsSlice'
import { AppDispatch } from '../../redux/store'

import Search from '../../components/products/Search'
import SortProducts from '../../components/products/SortProducts'
import useCategoriesState from '../../hooks/useCategoriesState'
import useProductState from '../../hooks/useProductsState'
import { prices } from '../../../public/mock/priceData/prices'
// import { Category } from '../../redux/slices/categories/categoriesSlice'
// import { fetchCategories } from '../../redux/slices/categories/categoriesSlice'

const Home = () => {
  const { products, searchInput } = useProductState()

  const { categories } = useCategoriesState()

   //const [selectedCategory, setSelectedCategory] = useState<number[]>([])
   const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  //const [selectedCategory, setSelectedCategory] = useState('')
  

  const [priceRange, setPriceRange] = useState<number[]>([])

  const [currentPage, setCurrentPage] = useState(1)

  const [itemsPerPage] = useState(3)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts()) //! pass limit and page for pagination
  }, []) //dispatch as dependincies //! page and limit as dependincies

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value
    dispatch(searchProduct(searchItem))
  }

  //Filter by category and price functionality
  const handleSelectedCategory = (categoryId: string) => {
    //categoryId: string //category: Category
    // if (selectedCategory.includes(categoryId)) {
    //   const filteredCategories = selectedCategory.filter((category) => category !== categoryId)
    //   setSelectedCategory(filteredCategories)
    // } else {
    //   setSelectedCategory((prevState) => {
    //     return [...prevState, categoryId]
    //   })
    // }
    ///////////////////////////////
    setSelectedCategory((prevState) => {
      return prevState.includes(categoryId)
        ? prevState.filter((category) => category !== categoryId)
        : [categoryId]
    })
    ////////////////////////
    // const selectedCategoryMatch = categories.find((category) => category._id === categoryId)
    // if (selectedCategoryMatch) {
    //   setSelectedCategory(selectedCategoryMatch.title)
    // }

    // if (categories.includes(category)) {
    //   setSelectedCategory(category._id)
    // }
    // console.log(selectedCategory)
  }

  const handleSelectedPrice = (priceId: number) => {
    const selectedPriceRange = prices.find((price) => price.id === priceId)
    if (selectedPriceRange) {
      setPriceRange(selectedPriceRange.range)
    }
  }

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      // selectedCategory.length > 0
      //   ? selectedCategory.some((id) => product.categoryId.includes(Number(id)))
      //   : product
       selectedCategory.length > 0 ? selectedCategory.includes(product.category) : true

    // let categoryMatch = products
    // if (selectedCategory.length > 0 && (product.category === selectedCategory)) {
    //      categoryMatch = product
    //   } 
      

    
    
    const priceMatch =
      priceRange.length > 0
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : product

    const searchResult =
      searchInput !== ''
        ? product.title.toLowerCase().includes(searchInput.toLowerCase())
        : products

    return categoryMatch && priceMatch && searchResult
  })

  //Pagination
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
    toast.success('Added to cart successfully')
    dispatch(addToCart(product))
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
                        type="radio" 
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
        {currentItems.length > 0 &&
          currentItems.map((product: Product) => {
            const { _id, title, slug, image, description, price } = product
            return (
              <article className="product-card" key={_id}>
                <img src={image} alt={title} width={200} height={200} />
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
