import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const useCategoriesState = () => {
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  
    return { categories, isLoading, error }
}

export default useCategoriesState