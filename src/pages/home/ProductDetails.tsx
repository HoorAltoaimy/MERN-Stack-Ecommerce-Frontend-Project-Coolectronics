import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

//import useCategoriesState from '../../hooks/useCategoriesState'
import useProductsState from '../../hooks/useProductsState'
import { addToCart } from '../../redux/slices/cart/cartSlice'
import { Product, fetchProducts, fetchSingleProduct } from '../../redux/slices/products/productsSlice'
import { AppDispatch } from '../../redux/store'

const ProductDetails = () => {
  const { singleProduct } = useProductsState()
  console.log(singleProduct)

  //const { categories } = useCategoriesState()

  const { productSlug } = useParams() //getting the product id from the path

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    // if (productSlug) {
    //   dispatch(fetchProducts()).then(() => dispatch(fetchSingleProduct(singleProduct.slug)))
    // }
    dispatch(fetchSingleProduct(singleProduct.slug))
  }, [dispatch]) //productSlug

  // const getCategoryName = (id: number) => {
  //   const categoryFound = categories.find((category) => category._id === id)

  //   return categoryFound ? categoryFound.title + '. ' : 'No category assigned'
  // }

  const handleAddToCart = (product: Product) => {
    toast.success('Added to cart successfully')
    dispatch(addToCart(product))
  }

  // if (isLoading) {
  //   return <p>Data is loading</p>
  // }
  // if (error) {
  //   return <p>{error}</p>
  // }

  return (
    <div className="product-detailes-body">
      <div className="product-detailes-div">
        <div className="back">
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>

        {singleProduct && (
          <>
            <div className="product-img">
              <img src={singleProduct.image} alt={singleProduct.title} width={300} height={300} />
            </div>
            <div className="product-info">
              <h2>{singleProduct.title}</h2>
              <p>Description: {singleProduct.description}</p>
              <p>Category:{singleProduct.category}</p>
              <p>Price: {singleProduct.price} SAR</p>
              <div className="div-btn">
                <button
                  className="btn"
                  onClick={() => {
                    handleAddToCart(singleProduct)
                  }}>
                  Add to cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
