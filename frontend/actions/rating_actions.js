import * as RatingAPIUtil from '../util/ratings_api_util';

export const RECEIVE_RATING = 'RECEIVE_RATING';

export const createRating = rating => dispatch => (
  RatingAPIUtil.createRating(rating).then(rating => (
    dispatch(receiveRating(rating))
  ))
);

export const updateRating = (id, rating) => dispatch => (
  RatingAPIUtil.updateRating(id, rating).then(rating => (
    dispatch(receiveRating(rating))
  ))
);

export const receiveRating = rating => ({
  type: RECEIVE_RATING,
  rating
});