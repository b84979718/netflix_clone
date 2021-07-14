import {Component} from 'react'
import Slider from 'react-slick'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

class ReactSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {netflixOriginals: props.movies}
  }

  renderSlider = () => {
    const {netflixOriginals} = this.state
    const {page} = this.props

    return (
      <Slider {...settings}>
        {netflixOriginals.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          return (
            <div className="react-slick-item" key={movie.id}>
              <Link to={`/movies/${page}/${movie.id}`} className="link">
                <img
                  className="poster"
                  src={movieImage}
                  alt={movie.original_title}
                />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {heading} = this.props

    return (
      <div className="slick-app-container">
        <h1 className="react-slick-heading">{heading}</h1>
        <div style={{width: '80%'}}>{this.renderSlider()}</div>
      </div>
    )
  }
}

export default withRouter(ReactSlider)
