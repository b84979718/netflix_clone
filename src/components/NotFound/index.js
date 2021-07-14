import Logo from '../Logo'
import './index.css'

const NotFound = props => {
  const goToHome = () => {
    const {history} = props
    history.replace('./')
  }
  return (
    <div className="not-found-section">
      <div className="not-found-navbar">
        <Logo />
      </div>
      <div className="not-found-container">
        <h1 className="not-found-heading">Lost Your Way ?</h1>
        <p className="not-found-description">
          Sorry, We can&apos;t find that page. You can find lots to explore on
          Home page.
        </p>
        <button type="button" onClick={goToHome} className="not-found-button">
          Netflix Home
        </button>
        <h1 className="not-found-error-heading">
          Error-code <span className="error">NSES-404</span>
        </h1>
      </div>
    </div>
  )
}

export default NotFound
