import React from 'react';
import HomeModal from './home_modal';
import MovieContainer from '../movie/movie_container';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.handleEnterImg = this.handleEnterImg.bind(this);
    this.handleLeaveImg = this.handleLeaveImg.bind(this);
    this.handleClickImg = this.handleClickImg.bind(this);
    this.handleCreateRate = this.handleCreateRate.bind(this);
    this.handleUpdateRate = this.handleUpdateRate.bind(this);
    this.handleEnterPoster = this.handleEnterPoster.bind(this);
    this.handleLeavePoster = this.handleLeavePoster.bind(this);
    this.filter = this.filter.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);

    this.masterMovieList;

    this.state = {
      movies: {},
      moods: {
        happy: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-one.png",
        meh: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-zero.png",
        sad: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-negative.png",
        happyActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-one-select.png",
        mehActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-zero-selected.png",
        sadActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-negative-selected.png"
      },
      filters: {
        name: true,
        rating: false,
        genre: false
      }
    }
  }

  componentDidMount() {
    // console.log(Object.keys(this.state).map(key => this.state[key]));
    // console.log(this.props.createRating)
    this.props.fetchMovies().then(movies => {
      // console.log(Object.values(movies.movies)[0])
      const allMoviesArr = Object.values(movies.movies).sort((x,y) => x.title.split(" ")[0].localeCompare(y.title.split(" ")[0]));
      const allMoviesObj = Object.assign({}, allMoviesArr);
      this.masterMovieList = allMoviesObj;
      this.setState({movies: allMoviesObj});
    });
  }

  handleEnterImg(e) {
    if (e.target.id === "good") {
      e.target.src = this.state.moods.happyActive;
    } else if (e.target.id === "meh") {
      e.target.src = this.state.moods.mehActive;
    } else if (e.target.id === "bad") {
      e.target.src = this.state.moods.sadActive;
    }
  }

  handleLeaveImg(e) {
    const key = e.target.parentElement.parentElement.id;
    if (key && this.state.movies[key].rating && this.state.movies[key].rating.rate === 1 && e.target.id === "good") {
      e.target.src = this.state.moods.happyActive;
    } else if (key && this.state.movies[key].rating && this.state.movies[key].rating.rate === 0 && e.target.id === "meh") {
      e.target.src = this.state.moods.mehActive;
    } else if (key && this.state.movies[key].rating && this.state.movies[key].rating.rate === -1 && e.target.id === "bad") {
      e.target.src = this.state.moods.sadActive;
    } else if (e.target.id === "good") {
      e.target.src = this.state.moods.happy;
    } else if (e.target.id === "meh") {
      e.target.src = this.state.moods.meh;
    } else if (e.target.id === "bad") {
      e.target.src = this.state.moods.sad;
    }   
  }

  handleClickImg(e) {
    const key = e.target.parentElement.parentElement.id;
    if (key && this.state.movies[key].rating) {
      this.handleUpdateRate(e);
    } else {
      this.handleCreateRate(e);
    }
  }

  handleCreateRate(e) {
    const movieKey = e.target.parentElement.parentElement.id;
    const movieId = this.state.movies[movieKey].id;
    let rate;
    if (e.target.id === "good") {
      rate = 1;
    } else if (e.target.id === "meh") {
      rate = 0;
    } else if (e.target.id === "bad") {
      rate = -1;
    }
    // console.log(this.props.createRating);
    this.props.createRating({
      rate,
      movie_id: movieId
    }).then(rating => {
      // console.log(rating)
      let oldState = this.state;
      oldState.movies[movieKey].rating = rating.rating;
      this.setState({movies: oldState.movies});
    })
  }

  handleUpdateRate(e) {
    const movieKey = e.target.parentElement.parentElement.id;
    const ratingId = this.state.movies[movieKey].rating.id
    let rate;
    if (e.target.id === "good") {
      rate = 1;
    } else if (e.target.id === "meh") {
      rate = 0;
    } else if (e.target.id === "bad") {
      rate = -1;
    }
    this.props.updateRating(
      ratingId,
      {rate}
    ).then(rating => {
      let oldState = this.state;
      oldState.movies[movieKey].rating.rate = rate;
      this.setState({movies: oldState.movies});
    })
  }

  handleEnterPoster(e) {
    let poster;
    if (e.target.classList[0] === "overlay") {
      poster = e.target.previousSibling;
    } else if (e.target.classList[0] === "overlay-text") {
      poster = e.target.parentElement.previousSibling;
    } else {
      poster = e.target;
    }
    
    poster.classList.add('movie-poster-hover');
  }

  handleLeavePoster(e) {
    let poster;
    if (e.target.classList[0] === "overlay") {
      poster = e.target.previousSibling;
    } else if (e.target.classList[0] === "overlay-text") {
      poster = e.target.parentElement.previousSibling;
    } else {
      poster = e.target;
    }
    
    poster.classList.remove('movie-poster-hover');
  }

  deleteMovie (e) {
    const id = e.target.id;
    var answer = window.confirm("Delete Movie?")
    if (answer) {
      const movie = this.props.deleteMovie(id);
      // console.log(this.state.movies);
      const refreshedMoviesArr = Object.values(this.state.movies).filter(movie => movie.id != id);
      const refreshedMoviesObj = Object.assign({}, refreshedMoviesArr);
      this.setState({movies: refreshedMoviesObj});
    }
  }
 
  filter(e) {
    const target = e.target.tagName === "H4" ? e.target.parentElement : e.target;
    let movieList;
    if (target.id === "filter-name") {
      movieList = this.masterMovieList;
      this.setState({movies: movieList, filters: {
        name: true,
        rating: false,
        genre: false
      }});
    } else if (target.id === "filter-rating") {
      movieList = Object.values(this.masterMovieList).sort((x,y) => {
        // console.log(x,y)
        if (x.rating && y.rating) {
          // console.log(x,y);
          return y.rating.rate - x.rating.rate;
        } else if (x.rating) {
          return (-2) - x.rating.rate;
        } else if (y.rating) {
          return y.rating.rate - (-2);
        }
      });
      const allMoviesObj = Object.assign({}, movieList);
      this.setState({movies: allMoviesObj, filters: {
        name: false,
        rating: true,
        genre: false
      }});
    } else if (target.id === "filter-genre") {

    }
  }

  render() {
    return (
    <div id = "main-container">
      <div className="HomeHeader">
        <h1>Movie Ratings</h1>
        <HomeModal action={MovieContainer} />
      </div>
      <div className="filterMovies">
        <div className={`${this.state.filters.name ? "filter-active" : "filter"} filter-name`} id="filter-name" onClick={this.filter}>
         Name
        </div>
        <div className="filter-divider"></div>
        <div className={`${this.state.filters.rating ? "filter-active" : "filter"} filter-rating`} id="filter-rating" onClick={this.filter}>
         Rating
        </div>
        <div className="filter-divider"></div>
        <div className={`${this.state.filters.genre ? "filter-active" : "filter"} filter-genre`} id="filter-genre" onClick={this.filter}>
         Genre
        </div>
      </div>
      <ul id = "main-container-ul">
        {Object.keys(this.state.movies).map(key => 
          <div className="movie-block" id={this.state.movies[key].id} key={key}>
            <div className="img-block">
              <img src={this.state.movies[key].img} className="movie-poster-img" onMouseEnter={this.handleEnterPoster} onMouseLeave={this.handleLeavePoster}></img>
              <div className="overlay" onMouseEnter={this.handleEnterPoster} onMouseLeave={this.handleLeavePoster}>
                <div className="delete-container">
                   <div className="delete-button" id={this.state.movies[key].id} onClick={this.deleteMovie}>Delete</div>
                </div>
                <p className="overlay-text">{this.state.movies[key].description}</p>
              </div>
            </div>
            <p>
              <img onMouseEnter={this.handleEnterImg} onMouseLeave={this.handleLeaveImg} onClick={this.handleClickImg} 
                src={this.state.movies[key].rating && this.state.movies[key].rating.rate === 1 ? this.state.moods.happyActive : this.state.moods.happy} className="rating-img" id="good"></img>
              <img onMouseEnter={this.handleEnterImg} onMouseLeave={this.handleLeaveImg} onClick={this.handleClickImg} 
                src={this.state.movies[key].rating && this.state.movies[key].rating.rate === 0 ? this.state.moods.mehActive: this.state.moods.meh} className="rating-img" id="meh"></img>
              <img onMouseEnter={this.handleEnterImg} onMouseLeave={this.handleLeaveImg} onClick={this.handleClickImg} 
                src={this.state.movies[key].rating && this.state.movies[key].rating.rate === -1 ? this.state.moods.sadActive : this.state.moods.sad} className="rating-img" id="bad"></img>
              <h2>{this.state.movies[key].title} ({this.state.movies[key].year})</h2>
              {this.state.movies[key].genre}
            </p>
          </div>)}
      </ul>
    </div>)
  }
}

export default Home;