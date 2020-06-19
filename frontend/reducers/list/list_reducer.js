import { merge } from 'lodash';
import { RECEIVE_MOVIE_LISTS, RECEIVE_MOVIE_LIST } from '../../actions/list_actions';

const MovieListReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MOVIE_LISTS:
      return merge({}, action.lists);
    case RECEIVE_MOVIE_LIST:
      return merge({}, action.list);
    default:
      return state;
  }
};

export default MovieListReducer;