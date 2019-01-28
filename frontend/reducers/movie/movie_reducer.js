import { merge } from 'lodash';
import { RECEIVE_MOVIES, RECEIVE_MOVIE } from '../../actions/movie_actions';

const MovieReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_MOVIES:
      return merge({}, action.movies );
    case RECEIVE_MOVIE:
      return merge({}, action.movie );
    default:
      return state;
  }
};

export default MovieReducer;