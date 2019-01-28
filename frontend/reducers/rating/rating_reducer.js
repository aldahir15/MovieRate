import { merge } from 'lodash';
import { RECEIVE_RATING } from '../../actions/rating_actions';

const RatingReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RATING:
      return merge({}, action.rating );
    default:
      return state;
  }
};

export default RatingReducer;