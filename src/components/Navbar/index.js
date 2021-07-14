import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import {FaBars} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'
import NavbarLogo from '../NavbarLogo'

import './index.css'

class Navbar extends Component {
  state = {isClicked: false, isMobile: false}

  changeBorder = async () => {
    await this.setState({isClicked: true})
    const {history} = this.props
    history.replace('/search')
  }

  changeSearch = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  changeBar = () => {
    this.setState(prevState => ({isMobile: !prevState.isMobile}))
  }

  changeCross = () => {
    this.setState({isMobile: false})
  }

  render() {
    const {isClicked, isMobile} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassName
    let popularClassName
    let accountClassName
    const secondSection = isMobile ? '' : 'display'
    switch (path) {
      case '/popular':
        homeClassName = 'passive-one'
        popularClassName = 'active-one'
        accountClassName = 'passive-one'
        break
      case '/profile':
        homeClassName = 'passive-one'
        popularClassName = 'passive-one'
        accountClassName = 'active-one'
        break
      case '/search':
        homeClassName = 'passive-one'
        popularClassName = 'active-one'
        accountClassName = 'passive-one'
        break
      default:
        homeClassName = 'active-one'
        popularClassName = 'passive-one'
        accountClassName = 'passive-one'
        break
    }
    return (
      <nav className="navbar">
        <div className="navbar-first-section">
          <div>
            <Link to="/">
              <NavbarLogo />
            </Link>
            <Link to="/">
              <h1 className={`home-navbar ${homeClassName}`}>Home</h1>
            </Link>
            <Link to="/popular">
              <h1 className={`popular-navbar ${popularClassName}`}>Popular</h1>
            </Link>
          </div>
          <div>
            <div className="navbar-second-container">
              <div
                className={`search-input-container ${
                  isClicked && 'search-input-container1'
                }`}
              >
                <input
                  type="search"
                  className="search-input"
                  onKeyPress={this.changeSearch}
                  placeholder={isClicked ? 'search' : ''}
                />
                <BiSearchAlt2
                  className="search-icon"
                  onClick={this.changeBorder}
                />
              </div>
              <Link to="/profile">
                <CgProfile className="profile-image" />
              </Link>
              <FaBars className="bar-icon" onClick={this.changeBar} />
            </div>
          </div>
        </div>
        <div className="navbar-second-section-container">
          <div className={`navbar-second-section ${secondSection}`}>
            <Link to="/" className="navbar-second-section-link">
              <h1 className={`navbar-second-section-heading ${homeClassName}`}>
                Home
              </h1>
            </Link>
            <Link to="/popular" className="navbar-second-section-link">
              <h1
                className={`navbar-second-section-heading ${popularClassName}`}
              >
                Popular
              </h1>
            </Link>
            <Link to="/profile" className="navbar-second-section-link">
              <h1
                className={`navbar-second-section-heading ${accountClassName}`}
              >
                Account
              </h1>
            </Link>
            <ImCross className="cross-icon" onClick={this.changeCross} />
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
