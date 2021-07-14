import Cookies from 'js-cookie'
import Logo from '../Logo'
import './index.css'

const Profile = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const encrypted = '*'.repeat(password.length)
  const removeToken = () => {
    const {history} = props
    Cookies.remove('requestToken')
    history.replace('./login')
  }
  return (
    <div>
      <div className="profile-navbar">
        <Logo />
      </div>
      <div className="profile-first-section">
        <h1 className="profile-account-heading">Account</h1>
        <hr className="horizontal-line" />
        <div className="membership-container">
          <h1 className="member-ship-heading">Member ship</h1>
          <div>
            <h1 className="username-heading">{username}</h1>
            <h1 className="password-heading">Password : {encrypted}</h1>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="membership-container">
          <h1 className="member-ship-heading">Plan Details</h1>
          <h1 className="username-heading">Premium</h1>
          <h1 className="ultra-hd">Ultra HD</h1>
        </div>
        <hr className="horizontal-line" />
        <div className="logout-container">
          <button type="button" onClick={removeToken} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
