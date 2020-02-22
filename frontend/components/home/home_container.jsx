import { connect } from 'react-redux';
import Home from './home.jsx';
import { fetchMovies, fetchUserMovies, fetchMovie, createMovie, deleteMovie, fetchOMDBMovie } from '../../actions/movie_actions';
import { createRating, updateRating } from '../../actions/rating_actions';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
  const user = state.session;
  const movies = state.movies;
  const movie = state.movie;
  const rating = state.rating
  return {
    user,
    movies,
    movie,
    rating
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMovies()),
  fetchUserMovies: (id) => dispatch(fetchUserMovies(id)),
  fetchMovie: (id) => dispatch(fetchMovie(id)),
  deleteMovie: (id) => dispatch(deleteMovie(id)),
  fetchOMDBMovie: (title, year) => dispatch(fetchOMDBMovie(title, year)),
  createMovie: (title) => dispatch(createMovie(title)),
  createRating: (rating) => dispatch(createRating(rating)),
  updateRating: (id, rating) => dispatch(updateRating(id, rating))
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);