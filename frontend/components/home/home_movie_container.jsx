import { connect } from 'react-redux';
import HomeMovie from './home_movie.jsx';
import { fetchMovies, fetchUserMovies, fetchMovie, createMovie, deleteMovie, fetchOMDBMovie } from '../../actions/movie_actions';
import { createRating, updateRating, deleteRating } from '../../actions/rating_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchMovie: (id) => dispatch(fetchMovie(id)),
    deleteRating: (id) => dispatch(deleteRating(id)),
    createRating: (rating) => dispatch(createRating(rating)),
    updateRating: (id, rating) => dispatch(updateRating(id, rating))
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeMovie);