import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const useProductsState = () => {
    const { products, isLoading, error, searchInput, singleProduct } = useSelector(
      (state: RootState) => state.productsReducer
    )
    return {
      products,
      isLoading,
      error,
      searchInput,
      singleProduct
    }
}

export default useProductsState