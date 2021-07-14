import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Footer from '../Footer'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Popular extends Component {
  state = {isLoading: true, popularMovies: [], page: 1}

  componentDidMount() {
    this.getPopularMovies()
  }

  changeLeftPage = async () => {
    const {page} = this.state
    if (page !== 1) {
      await this.setState({page: page - 1, isLoading: true})
      this.getPopularMovies()
    }
  }

  changeRightPage = async () => {
    const {page} = this.state
    if (page !== 20) {
      await this.setState({page: page + 1, isLoading: true})
      this.getPopularMovies()
    }
  }

  getPopularMovies = async () => {
    const {page} = this.state
    const popularMoviesResponse = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=bb6a5dc02b7a92508622341b49e23f59&language=en-US&page=${page}`,
    )
    const popularMovies = await popularMoviesResponse.json()
    this.setState({popularMovies: popularMovies.results, isLoading: false})
  }

  renderPopularPage = () => {
    const {popularMovies, page} = this.state
    return (
      <div className="home-background">
        <Navbar searchInput={this.searchInput} />
        <div className="popular-movies-list-container">
          <ul className="popular-movies-container">
            {popularMovies.map(each => {
              const movieImage = `https://image.tmdb.org/t/p/original/${each.poster_path}`
              return (
                <Link
                  to={`/movies/${page}/${each.id}`}
                  className="link1"
                  key={each.id}
                >
                  <li key={each.id}>
                    <img
                      src={movieImage}
                      alt={each.original_title}
                      className="similar-movie-image"
                    />
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>
        <div className="pages-paragraph">
          <p className="less-than" onClick={this.changeLeftPage}>
            {'<'}
          </p>{' '}
          <p> {page} of 20 </p>
          <p className="less-than" onClick={this.changeRightPage}>
            {'>'}
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div className="home-background">
            <Navbar searchInput={this.searchInput} />
            <div className="spinner-background">
              <Loader type="TailSpin" color="#D81F26" height={60} width={60} />
            </div>
          </div>
        ) : (
          this.renderPopularPage()
        )}
      </>
    )
  }
}

export default Popular
