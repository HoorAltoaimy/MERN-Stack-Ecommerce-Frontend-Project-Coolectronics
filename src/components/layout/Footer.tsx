import { ChangeEvent, FormEvent, useState } from 'react'

import { FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6'
import { MdOutlineMail } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Footer = () => {

  const [email, setEmail] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value
    setEmail(email)
  }
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (email.length < 10) {
      toast.error('Pleas provide a valid email')
      return
    }
    toast.success('Registered successfully')
  }

  return (
    <div className="footer">
      <div className="contact">
        <h4>Do not hesitate to contact us on email:</h4>

        <p>
          <MdOutlineMail />
          coolectronics@example.com
        </p>
      </div>

      <form className="newsletter" onSubmit={handleSubmit}>
        <p>Subscribe to our newsletter to recive special offers!</p>
        <label htmlFor="newsletter">Your email: </label>
        <div>
          <input
            type="email"
            name="newsletter"
            id="newsletter"
            placeholder="xyz@example.com"
            value={email}
            onChange={handleChange}
            required
          />
          <button className="btn" type="submit">
            Submit
          </button>
          <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
        </div>
      </form>

      <div className="pages">
        Find our pages:
        <div className="pages-icons">
          <a href="https://twitter.com/">
            <FaXTwitter />
          </a>
          <a href="https://www.instagram.com/">
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com/">
            <FaTiktok />
          </a>
        </div>
      </div>

      <div className="copyright">Copyright © 2023 Coolectronics. All rights reserved.</div>
    </div>
  )
}

export default Footer
