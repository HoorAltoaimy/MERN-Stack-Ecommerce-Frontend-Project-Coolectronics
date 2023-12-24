import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
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
import showToast from '../../utils/toastUtils'


const Categories = () => {
  const { categories, error } = useCategoriesState()
  console.log(categories)

  const [categoryName, setCategoryName] = useState('')

  const [isEdit, setIsEdit] = useState(false)

  const [editId, setEditId] = useState('0')

  const [validation, setValidation] = useState('')

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (error) {
      showToast('error', error)
    }
  }, [error])

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

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

      try {
        const response = await dispatch(editCategory(editedCategoryData))

        if (response.meta.requestStatus === 'fulfilled') {
          showToast('success', 'Category updated successfully')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast('error', error?.response?.data.message)
        }
      }

    } else {
      try {
        const response = await dispatch(createCategory(categoryName))
        if (response.meta.requestStatus === 'fulfilled') {
          showToast('success', 'New category created successfully')
          dispatch(fetchCategories())
        }        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast('error', error?.response?.data.message)
        }
      }
    }

    setCategoryName('')
    setValidation('')
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await dispatch(deleteCategory(id))
      if (response.meta.requestStatus === 'fulfilled') {
        showToast('success', 'Category deleted successfully')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
          showToast('error', error?.response?.data.message)
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
