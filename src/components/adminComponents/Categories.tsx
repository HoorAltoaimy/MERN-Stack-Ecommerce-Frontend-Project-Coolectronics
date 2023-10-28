import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store'
import {
  Category,
  addCategory,
  deleteCategory,
  fetchCategories
} from '../../redux/slices/categories/categoriesSlice'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

const Categories = () => {
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )

  const [newCategory, setNewCategory] = useState({
    id: 0,
    name: ''
  })

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewCategory((prevCategories) => {
      return { ...prevCategories, [name]: value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(addCategory(newCategory))
    console.log(categories) //1 issue in adding the new category to the categories array
    setNewCategory({
      id: 0,
      name: ''
    })
  }

  const handleDeleteCategory = (id: number) => {
    dispatch(deleteCategory(id))
  }

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
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">Category ID:</label>
          <input type="text" name="id" id="id" value={newCategory.id} onChange={handleChange} />
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newCategory.name}
            onChange={handleChange}
          />
          <button type="submit">Create Category</button>
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
                  <button
                    onClick={() => {
                      handleDeleteCategory(id)
                    }}>
                    Delete
                  </button>
                </article>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Categories
