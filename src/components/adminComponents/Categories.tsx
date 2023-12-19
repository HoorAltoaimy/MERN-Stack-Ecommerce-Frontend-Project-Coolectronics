import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'

import useCategoriesState from '../../hooks/useCategoriesState'
import {
  Category,
  createCategory,
  deleteCategory,
  editCategory,
  fetchCategories
} from '../../redux/slices/categories/categoriesSlice'
import { AppDispatch } from '../../redux/store'
import AdminSidebar from './AdminSidebar'


const Categories = () => {
  const { categories, isLoading, error } = useCategoriesState()

  const [categoryName, setCategoryName] = useState('')

  const [isEdit, setIsEdit] = useState(false)

  const [editId, setEditId] = useState('0')

  const [validation, setValidation] = useState('')

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  console.log(categories);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCategoryName = event.target.value
    setCategoryName(newCategoryName)
  }
  
  const handleEditCategory = (id: string, title: string) => {
    setEditId(id)
    setIsEdit(!isEdit)

    if (!isEdit) {
      setCategoryName(title)
    } else {
      setCategoryName('')
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    
    if (categoryName.length < 3) {
      setValidation('Category name should be at least 3 characters')
      return
    }
    if (isEdit) {
      const editedCategoryData = { _id: editId, title: categoryName }
      dispatch(editCategory(editedCategoryData))

    } else {
      try {
        const newCategory = { title: categoryName }
        const response =  dispatch(createCategory(newCategory))
        dispatch(fetchCategories())
        console.log(response)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error?.response?.data.message)
        }
      }
    }

    setCategoryName('')
    setValidation('')
  }

  const handleDeleteCategory = (id: string) => {
    try {
      dispatch(deleteCategory(id))
      toast.success('Category deleted successfully')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data.message)
      }
    }
  }

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
  // if (error) {
  //   return <p>{error}</p>
  // }

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
                  const { _id, title } = category
                  return (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td>{title}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => {
                            handleEditCategory(_id, title)
                          }}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => {
                            handleDeleteCategory(_id)
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
