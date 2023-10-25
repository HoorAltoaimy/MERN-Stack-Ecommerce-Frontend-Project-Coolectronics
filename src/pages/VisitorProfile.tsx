import { ChangeEvent, FormEvent } from 'react'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/users/userSlice'
import { useNavigate } from 'react-router-dom'

const VisitorProfile = () => {
  //fetch the data from users.json to the input fields to edite them

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  const handleClick = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <h3>Visitor profile</h3>

      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" onChange={handleChange} />
        <input type="text" name="firstName" onChange={handleChange} />
        <button type="submit">Edit</button>
      </form>
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default VisitorProfile
