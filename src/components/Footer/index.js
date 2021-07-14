import {ImGoogle} from 'react-icons/im'
import {FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="contact-us-section">
    <div className="contact-us-icons-container">
      <ImGoogle className="contact-us-icon" />
      <FaTwitter className="contact-us-icon" />
      <FaInstagram className="contact-us-icon" />
      <FaYoutube className="contact-us-icon" />
    </div>
    <h1 className="contact-us-heading">Contact Us</h1>
  </div>
)

export default Footer
