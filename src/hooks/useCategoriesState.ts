import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const useCategoriesState = () => {
  const { categories, isLoading, error, status } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  
    return { categories, isLoading, error, status }
}

export default useCategoriesState
