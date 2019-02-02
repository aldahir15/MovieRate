import React from 'react';
import HomeModal from './home_modal';
import MovieContainer from '../movie/movie_container';

console.log(process.env.REACT_APP_WEATHER_API_KEY)


class Home extends React.Component {
  constructor(props){
    super(props);
    this.handleEnterImg = this.handleEnterImg.bind(this);
    this.handleLeaveImg = this.handleLeaveImg.bind(this);
    this.handleClickImg = this.handleClickImg.bind(this);
    this.handleCreateRate = this.handleCreateRate.bind(this);
    this.handleUpdateRate = this.handleUpdateRate.bind(this);

    this.state = {
      movies: {},
      moods: {
        happy: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1548223816/rating-good.png",
        meh: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1548223816/rating-okay.png",
        sad: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1548223816/rating-bad.png",
        happyActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1548223816/rating-good-selected.png",
        mehActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1548223816/rating-okay-selected.png",
        sadActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1548223816/rating-bad-selected.png"
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

  render() {
    return (
    <div id = "main-container">
      <div className="HomeHeader">
        <h1>Movie List</h1>
        <HomeModal action={MovieContainer} />
      </div>
      <ul id = "main-container-ul">
        {Object.keys(this.state.movies).map(key => 
          <div className="movie-block" id={key} key={key}>
            <div className="img-block">
              <img src={this.state.movies[key].img} className="movie-poster-img"></img>
              <div className="overlay">
                <p>{this.state.movies[key].description}</p>
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