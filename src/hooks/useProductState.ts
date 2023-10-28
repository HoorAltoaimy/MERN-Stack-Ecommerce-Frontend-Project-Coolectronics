import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const useProductState = () => {
    const { products, isLoading, error, searchInput } = useSelector(
      (state: RootState) => state.productsReducer
    )
    return {
      products,
      isLoading,
      error,
      searchInput
    }
}

export default useProductState