import { useDispatch } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import { AppDispatch } from '../../redux/store'
import {
  Category,
  addCategory,
  deleteCategory,
  editCategory
} from '../../redux/slices/categories/categoriesSlice'
import { ChangeEvent, FormEvent, useState } from 'react'
import useCategoriesState from '../../hooks/useCategoriesState'
import { v4 as uuidv4 } from 'uuid'

const Categories = () => {
  const { categories, isLoading, error } = useCategoriesState()

  const [categoryName, setCategoryName] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState(0)

  const dispatch: AppDispatch = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCategoryName = event.target.value
    setCategoryName(newCategoryName)
  }

  const handleEditCategory = (id: number, name: string) => {
    setEditId(id)
    setIsEdit(!isEdit)
    if (!isEdit) {
      setCategoryName(name)
    } else {
      setCategoryName('')
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (isEdit) {
      const editCategoryData = { id: editId, name: categoryName }
      dispatch(editCategory(editCategoryData))
    } else {
      const newCategory = { id: uuidv4(), name: categoryName }
      dispatch(addCategory(newCategory))
    }

    setCategoryName('')
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
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main-content">
        <div className="admin-categories">
          <h4 className="title">Create New Category</h4>
          <form onSubmit={handleSubmit}>
            {/* <label htmlFor="name">Category Name:</label> */}
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Category Name"
              value={categoryName}
              onChange={handleChange}
            />
            <button type="submit" className="btn">
              {isEdit ? 'Save' : 'Create'}
            </button>
          </form>

          <h3 className="title">CATEGORIES</h3>

          <div className="category">
            <table>
              <thead>
                <td>Category ID</td>
                <td>Category Name</td>
                <td>Edit Category</td>
                <td>Delete Category</td>
              </thead>
              {categories.length > 0 &&
                categories.map((category: Category) => {
                  const { id, name } = category
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => {
                            handleEditCategory(id, name)
                          }}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => {
                            handleDeleteCategory(id)
                          }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
