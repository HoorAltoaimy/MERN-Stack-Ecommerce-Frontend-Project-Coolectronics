import { ChangeEvent, FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editCategory } from '../../redux/slices/categories/categoriesSlice'
import { RootState } from '../../redux/store'

const EditCategory = () => {

    const { categories } = useSelector(
      (state: RootState) => state.categoriesReducer
    )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()

  const [id, setId] = useState(state.id)
  const [name, setName] = useState(state.name)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'id') {
      setId(event.target.value)
    } else if (event.target.name === 'name') {
      setName(event.target.value)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const editedCategory = {
      id: id,
      name: name
    }
    if (!id || !name) {
      alert('add id and name')
    } else {
        dispatch(editCategory(editedCategory))
        console.log('edeited successfully')
        console.log(categories)
        navigate('/admin/adminDashboard/categories')
    }
  }

  return (
    <div>
      <h2>Edit Category</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" value={id} onChange={handleChange} />
        <br /> <br />
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          onChange={handleChange}
        />
        <br /> <br />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditCategory
