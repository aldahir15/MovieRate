import * as MovieAPIUtil from '../util/movies_api_util';
import * as OMDBAPIUtil from '../util/omdb_api_util';

export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export const RECEIVE_MOVIE = 'RECEIVE_MOVIE';

export const fetchMovies = () => dispatch => (
  MovieAPIUtil.fetchMovies().then(movies => (
    dispatch(receiveMovies(movies))
  ))
);

export const fetchUserMovies = (id) => dispatch => (
  MovieAPIUtil.fetchUserMovies(id).then(movies => (
    dispatch(receiveMovies(movies))
  ))
);

export const fetchMovie = (id) => dispatch => (
  MovieAPIUtil.fetchMovie(id).then(movie => (
    dispatch(receiveMovie(movie))
  ))
);

export const createMovie = movie => dispatch => (
  MovieAPIUtil.createMovie(movie).then(movie => (
    dispatch(receiveMovie(movie))
  ))
);

export const updateMovie = movie => dispatch => (
  MovieAPIUtil.updateMovie(movie).then(movie => (
    dispatch(receiveMovie(movie))
  ))
);

export const deleteMovie = movie => dispatch => (
  MovieAPIUtil.deleteMovie(movie).then(() => (
    dispatch(receiveMovie({}))
  ))
);

export const receiveMovies = movies => ({
  type: RECEIVE_MOVIES,
  movies
});

export const receiveMovie = movie => ({
  type: RECEIVE_MOVIE,
  movie
});

export const fetchOMDBMovie = (title, year) => dispatch => (
  OMDBAPIUtil.fetchOMDBMovie(title, year).then(movie => (
    dispatch(receiveMovies(movie))
  ))
);