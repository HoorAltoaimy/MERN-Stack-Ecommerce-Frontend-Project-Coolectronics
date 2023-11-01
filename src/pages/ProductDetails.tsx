import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchProducts, showProductDetailes } from '../redux/slices/products/productsSlice'
import { FaArrowLeft } from 'react-icons/fa'

const ProductDetails = () => {
  const { singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { categories } = useSelector((state: RootState) => state.categoriesReducer)

  const dispatch: AppDispatch = useDispatch()

  const { idNumber } = useParams() //getting the product id from the path

  useEffect(() => {
    if (idNumber) {
      dispatch(fetchProducts()).then(() => dispatch(showProductDetailes(Number(idNumber))))
    }
  }, [dispatch, idNumber])

  if (isLoading) {
    return <p>Data is loading</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const getCategoryName = (id: number) => {
    const categoryFound = categories.find((category) => category.id === id)
    
    return categoryFound? categoryFound.name + '. ' : 'No category assigned' 
  }

  return (
    <div className="body">
      <div className="product-detailes-div">
        <div className="back">
          <Link to="/">
            <FaArrowLeft />{' '}
          </Link>
        </div>

        {singleProduct && (
          // <article>
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
              {singleProduct.variants.length > 0 && (<p>Variants: {singleProduct.variants && singleProduct.variants.join(', ')}</p>)}
              {singleProduct.sizes.length > 0 && (
                <p>Sizes: {singleProduct.sizes && singleProduct.sizes.join(', ')}</p>
              )}
              <p>Price: {singleProduct.price} SAR</p>
              <div className="div-btn">
                <button className="btn">Add to cart</button>
              </div>
            </div>
            {/* </article> */}
          </>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
