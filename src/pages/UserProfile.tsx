import { ChangeEvent, FormEvent } from 'react'

const UserProfile = () => {
  //fetch the data from users.json to the input fields to edite them

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <div>
      <h3>User profile</h3>

      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" onChange={handleChange} />
        <input type="text" name="firstName" onChange={handleChange} />
        <button type="submit">Edit</button>
      </form>
    </div>
  )
}

export default UserProfile
