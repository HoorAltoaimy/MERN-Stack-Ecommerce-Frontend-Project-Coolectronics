import { FormEvent } from 'react'

import { FaXTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6'
import { MdOutlineMail } from 'react-icons/md'

const Footer = () => {

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return (
    <div className="footer">
      <div className="contact">
        <h4>Do not hesitate to contact us on email:</h4>

        <p>
          <MdOutlineMail />
          coolectronice@example.com
        </p>
      </div>

      <form className="newsletter" onSubmit={handleSubmit}>
        <label htmlFor="newsletter">Subscribe to our newsletter to recive special offers!</label>
        <input type="email" name="newsletter" id="newsletter" />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      <div className="pages">
        Find our pages
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

      <div>Copyright © 2023 Coolectronics. All rights reserved.</div>
    </div>
  )
}

export default Footer
