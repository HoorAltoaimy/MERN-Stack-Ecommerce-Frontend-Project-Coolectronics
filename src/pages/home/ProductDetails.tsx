import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import useCategoriesState from '../../hooks/useCategoriesState'
import useProductsState from '../../hooks/useProductsState'
import { fetchProducts, showProductDetailes } from '../../redux/slices/products/productsSlice'
import { AppDispatch } from '../../redux/store'

const ProductDetails = () => {
  const { singleProduct, isLoading, error } = useProductsState()

  const { categories } = useCategoriesState()

  const { idNumber } = useParams() //getting the product id from the path

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (idNumber) {
      dispatch(fetchProducts()).then(() => dispatch(showProductDetailes(Number(idNumber))))
    }
  }, [dispatch, idNumber])

  const getCategoryName = (id: number) => {
    const categoryFound = categories.find((category) => category.id === id)

    return categoryFound ? categoryFound.name + '. ' : 'No category assigned'
  }

  if (isLoading) {
    return <p>Data is loading</p>
  }
  if (error) {
    return <p>{error}</p>
  }

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
              <img src={singleProduct.image} alt={singleProduct.name} width={300} height={300} />
            </div>
            <div className="product-info">
              <h2>{singleProduct.name}</h2>
              <p>Description: {singleProduct.description}</p>
              <p>
                Categories:{' '}
                {singleProduct.categories &&
                  singleProduct.categories.map((categoryId) => getCategoryName(categoryId))}
              </p>
              {singleProduct.variants && singleProduct.variants.length > 0 && (
                <p>Variants: {singleProduct.variants && singleProduct.variants.join(', ')}</p>
              )}
              {singleProduct.sizes && singleProduct.sizes.length > 0 && (
                <p>Sizes: {singleProduct.sizes && singleProduct.sizes.join(', ')}</p>
              )}
              <p>Price: {singleProduct.price} SAR</p>
              <div className="div-btn">
                <button className="btn">Add to cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
