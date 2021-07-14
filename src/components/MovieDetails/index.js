import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class MovieDetails extends Component {
  state = {
    movieDetails: {},
    similarMovies: [],
    isLoading: true,
    sourceFound: true,
  }

  componentDidMount() {
    this.getSpecificMovieDetails()
  }

  getSpecificMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id, page} = params
    const movieDetailsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=bb6a5dc02b7a92508622341b49e23f59&language=en-US`,
    )
    const movieDetails = await movieDetailsResponse.json()
    console.log(movieDetails.success)
    if (movieDetails.success === false) {
      this.setState({sourceFound: false, isLoading: false})
    } else {
      const similarMoviesResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=bb6a5dc02b7a92508622341b49e23f59&language=en-US&page=${page}`,
      )
      const similarMovies = await similarMoviesResponse.json()
      const updatedMovieDetails = {
        backdropPath: movieDetails.backdrop_path,
        budget: movieDetails.budget,
        genres: movieDetails.genres,
        originalLanguage: movieDetails.original_language,
        title: movieDetails.title,
        overview: movieDetails.overview,
        count: movieDetails.vote_count,
        rating: movieDetails.vote_average,
        releaseDate: movieDetails.release_date,
        runtime: movieDetails.runtime,
        posterPath: movieDetails.posterPath,
      }
      this.setState({
        movieDetails: updatedMovieDetails,
        isLoading: false,
        similarMovies: similarMovies.results.slice(0, 6),
      })
    }
  }

  renderDetailsPage = () => {
    const {movieDetails, similarMovies} = this.state
    const {
      title,
      backdropPath,
      runtime,
      originalLanguage,
      releaseDate,
      overview,
      genres,
      count,
      rating,
      budget,
    } = movieDetails
    const backgroundImage = `https://image.tmdb.org/t/p/original/${backdropPath}`
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const date = new Date(releaseDate)
    let dateEnd
    const day = date.getDay().toString()
    if (day.endsWith('3')) {
      dateEnd = 'rd'
    } else if (day.endsWith('2')) {
      dateEnd = 'nd'
    } else if (day.endsWith('1')) {
      dateEnd = 'st'
    } else {
      dateEnd = 'th'
    }
    return (
      <div className="home-background">
        <Navbar />
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
          className="movies-details-top-container"
        >
          <h1 className="movies-details-top-container-heading">{title}</h1>
          <p className="hours-container">
            <span className="hours">{`${hours}h ${minutes}m`}</span>
            <span className="language">{originalLanguage}</span>
            <span className="hours">{date.getFullYear()}</span>
          </p>
          <p className="overview">{overview}</p>
          <button type="button" className="button">
            Play
          </button>
        </div>
        <div className="genre-container">
          <ul>
            <li className="genre-heading">Genres</li>
            {genres.map(each => (
              <li className="genre-option" key={each.id}>
                {each.name}
              </li>
            ))}
          </ul>
          <ul>
            <li className="genre-heading">Languages</li>
            <li className="genre-option">English</li>
            <li className="genre-option">Hindi</li>
            <li className="genre-option">Telugu</li>
          </ul>
          <ul>
            <li className="genre-heading">Rating Count</li>
            <li className="genre-option">{count}</li>
            <li className="genre-heading">Rating Average</li>
            <li className="genre-option">{rating}</li>
          </ul>
          <ul>
            <li className="genre-heading">Budget</li>
            <li className="genre-option">{budget} crores</li>
            <li className="genre-heading">Release Date</li>
            <li className="genre-option">{`${day}${dateEnd} ${date.toLocaleString(
              'default',
              {month: 'long'},
            )} ${date.getFullYear()}`}</li>
          </ul>
        </div>
        <h1 className="similar-heading">More like this</h1>
        <ul className="similar-movies-container">
          {similarMovies.map(each => {
            const movieImage = `https://image.tmdb.org/t/p/original/${each.poster_path}`
            return (
              <li key={each.id} className="link">
                <img
                  src={movieImage}
                  alt={each.original_title}
                  className="similar-movie-image"
                  onClick={this.changeUrl}
                />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderResourceNotFound = () => (
    <div className="home-background">
      <Navbar />
      <div className="resource-not-found">
        <h1 className="resource-not-found-heading">
          Sorry, The resource you requested could not be found
        </h1>
      </div>
    </div>
  )

  renderRequirePage = () => {
    const {sourceFound} = this.state
    return (
      <>
        {sourceFound ? this.renderDetailsPage() : this.renderResourceNotFound()}
      </>
    )
  }

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
          this.renderRequirePage()
        )}
      </>
    )
  }
}

export default MovieDetails
