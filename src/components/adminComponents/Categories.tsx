import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store'
import { Category, fetchCategories } from '../../redux/slices/categories/categoriesSlice'
import { useEffect } from 'react'

const Categories = () => {
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  
  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <form>
          <input type="text" name="category" />
          <button>Create Category</button>
        </form>

        <h2>Categories:</h2>
        <div className="category">
          {categories.length > 0 &&
            categories.map((category: Category) => {
              const { id, name } = category
              return (
                <article key={id}>
                  <p>id: {id}</p>
                  <p>name: {name}</p>
                  <button>Edit</button>
                  <button>Delete</button>
                </article>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Categories
