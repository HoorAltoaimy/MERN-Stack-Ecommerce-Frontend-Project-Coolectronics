import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchProducts, showProductDetailes } from '../redux/slices/products/productsSlice'

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
    <div>
      {singleProduct && (
        <article>
          <img src={singleProduct.image} alt={singleProduct.name} width={300} height={300} />
          <h4>name: {singleProduct.name}</h4>
          <p>description: {singleProduct.description}</p>
          <p>categories: {singleProduct.categories && singleProduct.categories.map((categoryId) => getCategoryName(categoryId))}</p>
          <p>variants: {singleProduct.variants && singleProduct.variants.join(', ')}</p>
          <p>sizes: {singleProduct.sizes && singleProduct.sizes.join(', ')}</p>
          <p>price: {singleProduct.price} SAR</p>
          <button>Add to cart</button>
        </article>
      )}
    </div>
  )
}

export default ProductDetails
