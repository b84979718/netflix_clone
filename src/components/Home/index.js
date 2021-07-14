import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import ReactSlider from '../ReactSlider'
import Footer from '../Footer'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    trendingMovies: [],
    topRatedMovies: [],
    originals: [],
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    const trendingResponse = await fetch(
      'https://api.themoviedb.org/3/trending/all/week?api_key=bb6a5dc02b7a92508622341b49e23f59',
    )
    const trendingMovies = await trendingResponse.json()
    const topRatedResponse = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=bb6a5dc02b7a92508622341b49e23f59&language=en-US',
    )
    const topRatedMovies = await topRatedResponse.json()
    const originalResponse = await fetch(
      'https://api.themoviedb.org/3/discover/tv?api_key=bb6a5dc02b7a92508622341b49e23f59',
    )
    const originals = await originalResponse.json()
    this.setState({
      trendingMovies: trendingMovies.results,
      topRatedMovies: topRatedMovies.results,
      originals: originals.results,
      isLoading: false,
    })
  }

  getMoviesList = () => {
    const {trendingMovies, topRatedMovies, originals} = this.state
    return (
      <>
        <ReactSlider movies={trendingMovies} heading="Trending Now" page="1" />
        <ReactSlider movies={topRatedMovies} heading="Top Rated" page="1" />
        <ReactSlider movies={originals} heading="Originals" page="1" />
        <Footer />
      </>
    )
  }

  renderHomePage = () => (
    <div className="home-background">
      <Navbar />
      <div className="movie-details-background">
        <h1 className="movie-details-name">Super Man</h1>
        <p className="movie-details-description">
          Superman is a fictional superhero who first appeared in American comic
          books published by DC Comics
        </p>
        <button type="button" className="movies-details-play-button">
          Play
        </button>
      </div>
      {this.getMoviesList()}
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div className="home-background">
            <Navbar />
            <div className="spinner-background">
              <Loader type="TailSpin" color="#D81F26" height={60} width={60} />
            </div>
          </div>
        ) : (
          this.renderHomePage()
        )}
      </>
    )
  }
}

export default Home
