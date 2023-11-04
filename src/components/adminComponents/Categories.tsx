import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import useCategoriesState from '../../hooks/useCategoriesState'
import {
  Category,
  addCategory,
  deleteCategory,
  editCategory
} from '../../redux/slices/categories/categoriesSlice'
import { AppDispatch } from '../../redux/store'

import AdminSidebar from './AdminSidebar'

const Categories = () => {
  const { categories, isLoading, error } = useCategoriesState()

  const [categoryName, setCategoryName] = useState('')

  const [isEdit, setIsEdit] = useState(false)

  const [editId, setEditId] = useState(0)

  const [validation, setValidation] = useState('')

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

    if (categoryName.length < 2) {
      setValidation('Category name should be at least 2 characters')
      return
    }
    if (isEdit) {
      const editCategoryData = { id: editId, name: categoryName }
      dispatch(editCategory(editCategoryData))
    } else {
      const newCategory = { id: uuidv4(), name: categoryName }
      dispatch(addCategory(newCategory))
    }

    setCategoryName('')
    setValidation('')
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
          <div className="admin-forms">
            <form onSubmit={handleSubmit}>
              <div className="admin-form-line">
                <label htmlFor="categoryName">Category Name:</label>
                <input
                  type="text"
                  name="categoryName"
                  id="categoryName"
                  value={categoryName}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="form-validation">{validation}</p>
              <button type="submit" className="btn">
                {isEdit ? 'Save' : 'Create'}
              </button>
            </form>
          </div>

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
