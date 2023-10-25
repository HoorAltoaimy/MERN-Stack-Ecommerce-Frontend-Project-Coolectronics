

const Register = () => {
//give default values for id and role(always visitor)
  return (
    <div>
      <form action="">
        <label htmlFor="firstName">firstName</label>
        <input type="text" name="firstName" id="firstName" />

        <label htmlFor="lastName">lastName</label>
        <input type="text" name="lastName" id="lastName" />

        <label htmlFor="email">email</label>
        <input type="text" name="email" id="email" />

        <label htmlFor="password">password</label>
        <input type="text" name="password" id="password" />
      </form>
    </div>
  )
}

export default Register