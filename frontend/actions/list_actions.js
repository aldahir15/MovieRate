import * as MovieListUtil from '../util/movie_list_util';

export const RECEIVE_MOVIE_LISTS = 'RECEIVE_MOVIE_LISTS';
export const RECEIVE_MOVIE_LIST = 'RECEIVE_MOVIE_LIST';

export const fetchMovieLists = (id) => dispatch => (
  MovieListUtil.fetchMovieList(id).then(lists => (
    dispatch(receiveMovieLists(lists))
  ))
);

export const receiveMovieLists = lists => ({
  type: RECEIVE_MOVIE_LISTS,
  lists
});