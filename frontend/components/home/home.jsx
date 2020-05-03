import React from 'react';
import HomeModal from './home_modal';
import MovieContainer from '../movie/movie_container';
import HomeMovie from './home_movie_container.jsx';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.filter = this.filter.bind(this);
    this.movieListToObj = this.movieListToObj.bind(this);

    this.masterMovieList;

    this.state = {
      movies: {},
      filters: {
        name: true,
        rating: false,
        genre: false
      }
    }
  }

  movieListToObj(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      const movie = arr[i];
      obj[movie.id] = movie;
    }
    return obj;
  }


  componentDidMount() {

    // this.props.fetchMovies().then(movies => {
    //   // console.log(Object.values(movies.movies)[0])
    //   const allMoviesArr = Object.values(movies.movies).sort((x,y) => x.title.split(" ")[0].localeCompare(y.title.split(" ")[0]));
    //   // const allMoviesObj = Object.assign({}, allMoviesArr);
    //   const allMoviesObj = this.movieListToObj(allMoviesArr); 
    //   this.masterMovieList = allMoviesObj;
    //   this.setState({movies: allMoviesObj});
    // });
    const userId = this.props.user.currentUser.id;
    this.props.fetchUserMovies(userId).then(movies => {
      // console.log(Object.values(movies.movies)[0])
      const allMoviesArr = Object.values(movies.movies).sort((x, y) => x.title.split(" ")[0].localeCompare(y.title.split(" ")[0]));
      // const allMoviesObj = Object.assign({}, allMoviesArr);
      const allMoviesObj = this.movieListToObj(allMoviesArr);
      this.masterMovieList = allMoviesObj;
      this.setState({ movies: allMoviesObj });
    });
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
      // const allMoviesObj = Object.assign({}, movieList);
      const allMoviesObj = this.movieListToObj(movieList);
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
          <HomeMovie movie={this.state.movies[key]} key={key}></HomeMovie>)}
      </ul>
    </div>)
  }
}

export default Home;

// {Object.keys(this.state.movies).map(key =>
//     <div className="movie-block" id={this.state.movies[key].id} key={key}>
//       <div className="img-block">
//         <img src={this.state.movies[key].img} className="movie-poster-img" onMouseEnter={this.handleEnterPoster} onMouseLeave={this.handleLeavePoster}></img>
//         <div className="overlay" onMouseEnter={this.handleEnterPoster} onMouseLeave={this.handleLeavePoster}>
//           <div className="delete-container">
//             <div className="delete-button" id={this.state.movies[key].id} onClick={this.deleteMovie}>Delete</div>
//           </div>
//           <p className="overlay-text">{this.state.movies[key].description}</p>
//         </div>
//       </div>
//       <p>
//         <img onMouseEnter={this.handleEnterImg} onMouseLeave={this.handleLeaveImg} onClick={this.handleClickImg}
//           src={this.state.movies[key].rating && this.state.movies[key].rating.rate === 1 ? this.state.moods.happyActive : this.state.moods.happy} className="rating-img" id="good"></img>
//         <img onMouseEnter={this.handleEnterImg} onMouseLeave={this.handleLeaveImg} onClick={this.handleClickImg}
//           src={this.state.movies[key].rating && this.state.movies[key].rating.rate === 0 ? this.state.moods.mehActive : this.state.moods.meh} className="rating-img" id="meh"></img>
//         <img onMouseEnter={this.handleEnterImg} onMouseLeave={this.handleLeaveImg} onClick={this.handleClickImg}
//           src={this.state.movies[key].rating && this.state.movies[key].rating.rate === -1 ? this.state.moods.sadActive : this.state.moods.sad} className="rating-img" id="bad"></img>
//         <h2>{this.state.movies[key].title} ({this.state.movies[key].year})</h2>
//         {this.state.movies[key].genre}
//       </p>
//     </div>)
// }