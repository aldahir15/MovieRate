import React from 'react';



class Movies extends React.Component {
  constructor(props){
    super(props);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.fetchOMDBMovie = this.fetchOMDBMovie.bind(this);
    this.saveOMDBMovie = this.saveOMDBMovie.bind(this);
    this.state = {
      fetchedMovieTitle: "",
      fetchedMovieYear: "",
      fetchedMovieRelease: "",
      fetchedMovieGenre: "",
      fetchedMovieRatingIMDB: "",
      fetchedMovieRatingRottenTomatoes: "",
      fetchedMovieImg: "",
      fetchedMovieDescription: ""
    }
  }

  componentDidMount(){
  }

  // componentWillReceiveProps(newProps){
  //   if (this.props.workout.id !== parseInt(newProps.match.params.workoutId)) {
  //     this.props.fetchWorkout(newProps.match.params.workoutId);
  //   }
  // }

  // componentWillUnmount(){

  // }

  deleteMovie(){
    this.props.deleteMovie(this.props.movie.id);
    this.props.history.push('/');
  }

  fetchOMDBMovie(e) {
    // console.log(e.target.className)
    if (e.key === 'Enter' || e.target.className === "fa fa-search") {
      e.preventDefault();
      let title = document.querySelector('#OMDBTit');
      let hidden =  document.querySelector('.hidden');
      if (hidden) {
        hidden.className = 'form';
      }

      // let ratings = 
      const movie = this.props.fetchOMDBMovie(title.value);
      movie.then((e) => this.setState({
        fetchedMovieTitle: e.movies.Title,
        fetchedMovieYear: e.movies.Year,
        fetchedMovieRelease: e.movies.Released,
        fetchedMovieGenre: e.movies.Genre,
        fetchedMovieRatingIMDB: e.movies.Ratings[0].Value,
        fetchedMovieRatingRottenTomatoes: e.movies.Ratings[1] ? e.movies.Ratings[1].Value : "",
        fetchedMovieImg: e.movies.Poster,
        fetchedMovieDescription: e.movies.Plot
      }));
    }
  }

  saveOMDBMovie(e) {
    e.preventDefault();
    const movie = {
      title: this.state.fetchedMovieTitle,
      description: this.state.fetchedMovieDescription,
      img: this.state.fetchedMovieImg,
      year: this.state.fetchedMovieYear,
      genre: this.state.fetchedMovieGenre
    };


    this.props.createMovie(movie).then(movie => location.reload(true));
  }


  render(){
    return(
      <div className="optin-container">
        <div className="cta">
          <input autocomplete="off" placeholder="Find Movie" id="OMDBTit" type="text" onKeyPress={this.fetchOMDBMovie}/>
          <button type="submit" onClick={this.fetchOMDBMovie}><i class="fa fa-search"></i></button>
        </div>

        <form className="form hidden">
          {this.state.fetchedMovieImg ? <img src={this.state.fetchedMovieImg} className="OMDB-img" ></img> : ""}
          <div className="OMDB-info">
                <ul className="OMDB-ul">
                  {this.state.fetchedMovieTitle ? <li>Title: {this.state.fetchedMovieTitle}</li> : ""}
                  {this.state.fetchedMovieYear ? <li>Year: {this.state.fetchedMovieYear}</li> : ""}
                  {this.state.fetchedMovieRelease ? <li>Released: {this.state.fetchedMovieRelease}</li> : ""}
                  {this.state.fetchedMovieGenre ? <li>Genre: {this.state.fetchedMovieGenre}</li> : ""}
                  {this.state.fetchedMovieRatingIMDB ? <li>IMDB Rating: {this.state.fetchedMovieRatingIMDB}</li> : ""}
                  {this.state.fetchedMovieRatingRottenTomatoes ? <li>Rotten Tomatoes Rating: {this.state.fetchedMovieRatingRottenTomatoes}</li> : ""}
                </ul>
                <div className="search-button">
                  {this.state.fetchedMovieTitle ? <button className="searchButton" onClick={this.saveOMDBMovie}><i class="fa fa-plus-circle" aria-hidden="true"></i> Save Movie</button> : ""}
              </div>
              </div>
        </form>	
        
      </div>
    );
  }
}

export default Movies;




// render(){
//   return(
//     <div className="Search-OMDB">
//       <div className="search-title">
//         <h1>SEARCH</h1>
//       </div>
//       <div className="search-button">
//         <input id="OMDBTitle" type="text"/>
//         <button className="searchButton" onClick={this.fetchOMDBMovie}>SEARCH</button>
//       </div>
//       <div className="OMDB-info">
//         {this.state.fetchedMovieImg ? <img src={this.state.fetchedMovieImg} className="OMDB-img" ></img> : ""}
//         <ul className="OMDB-ul">
//           {this.state.fetchedMovieTitle ? <li>Title: {this.state.fetchedMovieTitle}</li> : ""}
//           {this.state.fetchedMovieYear ? <li>Year: {this.state.fetchedMovieYear}</li> : ""}
//           {this.state.fetchedMovieRelease ? <li>Released: {this.state.fetchedMovieRelease}</li> : ""}
//           {this.state.fetchedMovieGenre ? <li>Genre: {this.state.fetchedMovieGenre}</li> : ""}
//           {this.state.fetchedMovieRatingIMDB ? <li>IMDB Rating: {this.state.fetchedMovieRatingIMDB}</li> : ""}
//           {this.state.fetchedMovieRatingRottenTomatoes ? <li>Rotten Tomatoes Rating: {this.state.fetchedMovieRatingRottenTomatoes}</li> : ""}
//         </ul>
//       </div>
//       <div className="search-button">
//         {this.state.fetchedMovieTitle ? <button className="searchButton" onClick={this.saveOMDBMovie}>Save Movie</button> : ""}
//       </div>
//     </div>
//   );
// }
