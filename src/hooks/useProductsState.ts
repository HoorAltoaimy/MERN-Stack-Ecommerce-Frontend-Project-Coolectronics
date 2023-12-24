import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const useProductsState = () => {
    const { products, isLoading, error, searchInput, singleProduct, pagination } = useSelector(
      (state: RootState) => state.productsReducer
    )
    return {
      products,
      isLoading,
      error,
      searchInput,
      singleProduct,
      pagination
    }
}

export default useProductsState