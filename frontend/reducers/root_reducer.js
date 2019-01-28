import { combineReducers } from 'redux';
import movie from './movie/movie_reducer';
import rating from './rating/rating_reducer';

export default combineReducers({
  movie,
  rating
});