import { combineReducers } from 'redux';
import movie from './movie/movie_reducer';
import rating from './rating/rating_reducer';
import session from './session_reducer';
import errors from './errors_reducer';



export default combineReducers({
  session,
  movie,
  rating,
  errors
});