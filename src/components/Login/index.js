import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Logo from '../Logo'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = requestToken => {
    const {history} = this.props
    const {username, password} = this.state

    Cookies.set('requestToken', requestToken, {
      expires: 30,
      path: '/',
    })
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)

    history.replace('/')
  }

  onSubmitFailure = () => {
    this.setState({showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const requestTokenResponse = await fetch(
      'https://api.themoviedb.org/3/authentication/token/new?api_key=bb6a5dc02b7a92508622341b49e23f59',
    )
    const json = await requestTokenResponse.json()
    const userDetails = {
      username,
      password,
      request_token: json.request_token,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const url =
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=bb6a5dc02b7a92508622341b49e23f59'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.request_token)
    } else {
      this.onSubmitFailure()
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="username-input-field"
          value={password}
          placeholder="Enter your password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          placeholder="Enter your Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError} = this.state
    const requestToken = Cookies.get('requestToken')
    if (requestToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <Logo />
          <h1 className="sign-in-heading">Sign in</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          {showSubmitError && (
            <p className="error-message">
              Please Enter a valid username & password
            </p>
          )}
          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>
      </div>
    )
  }
}

export default Login
