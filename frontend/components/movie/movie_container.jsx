import { connect } from 'react-redux';
import Movies from './movies.jsx';
import { fetchMovies, fetchMovie, createMovie, deleteMovie, fetchOMDBMovie } from '../../actions/movie_actions';
import { deleteRating } from '../../actions/rating_actions';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
  const user = state.session;
  const movies = state.movies;
  const movie = state.movie;
  return {
    user,
    movies,
    movie
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMovies()),
  fetchMovie: (id) => dispatch(fetchMovie(id)),
  deleteMovie: (id) => dispatch(deleteMovie(id)),
  deleteRating: (id) => dispatch(deleteRating(id)),
  fetchOMDBMovie: (title, year) => dispatch(fetchOMDBMovie(title, year)),
  createMovie: (title) => dispatch(createMovie(title))
});


export default connect(mapStateToProps, mapDispatchToProps)(Movies);