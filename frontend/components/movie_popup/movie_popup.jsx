import React from 'react';
// import HomeMovieModal from './home_movie_modal.jsx';

class MoviePopUp extends React.Component {
    constructor(props) {
        super(props);
        this.youtubeVideo = this.youtubeVideo.bind(this);

        this.state = {
            movie: {},
            trailerKey: null,
            key: 0,
            moods: {
                happy: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-one.png",
                meh: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-zero.png",
                sad: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-negative.png",
                happyActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-one-select.png",
                mehActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-zero-selected.png",
                sadActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-negative-selected.png"
            }
        }
    }

    componentDidMount() {
       console.log(this.props.movieId);

       this.props.fetchMovie(this.props.movieId).then(movie => {
        const currMovie = movie.movie;
        this.setState({ movie: currMovie });

        this.props.fetchMovieTrailer(currMovie.title, currMovie.year).then(movie => {
          const currMovie = movie.movies.results[0];
          const youtubeKey = currMovie.key; 
          this.setState({trailerKey: youtubeKey});
        })

       })

   }

   youtubeVideo() {
     if (this.state.trailerKey) {
        return (
            <iframe src={"https://www.youtube.com/embed/" + this.state.trailerKey}
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
                className="popup-youtube-video"
            />
        )
     } else {
         return;
     }
   }


    
  render() {
      console.log(this.props.fetchMovieTrailer);
      console.log(this.state);
      return (
          <div className="movie-popup-container">
            <div className="movie-popup-left">
                <img src={this.state.movie.img} className="movie-popup-poster"></img>
            </div>
            <div className="movie-popup-right">
                <h1>{this.state.movie.title}</h1>
                {this.youtubeVideo()}
            </div>
            <div className="movie-popup-information">
                <div className="popup-facts">
                    <div className="popup-facts-rated">
                      <div className="popup-item-container">                          
                        <div className="popup-item-label">Rated: </div>
                        <div className="popup-item-var">{this.state.movie.rated}</div>
                      </div>
                    </div>
                    <div className="popup-facts-genre">
                      <div className="popup-item-container">                          
                        <div className="popup-item-label">Genre: </div>
                        <div className="popup-item-var">{this.state.movie.genre}</div>
                      </div>
                    </div>
                    <div className="popup-facts-year">
                      <div className="popup-item-container">                          
                        <div className="popup-item-label">Year: </div>
                        <div className="popup-item-var">{this.state.movie.year}</div>
                      </div>
                    </div>
                    <div className="popup-facts-runtime">
                      <div className="popup-item-container">                          
                        <div className="popup-item-label">Runtime: </div>
                        <div className="popup-item-var">{this.state.movie.runtime}</div>
                      </div>
                    </div>
                </div>
                <div className="popup-description">
                    <h4>Description: </h4>
                    <div className="popup-item-var">{this.state.movie.description}</div>
                </div>
            </div>
          </div>
      )
  }
}

export default MoviePopUp;