import { connect } from 'react-redux';
import MoviePopUp from './movie_popup.jsx';
import { fetchMovies, fetchUserMovies, fetchMovie, createMovie, deleteMovie, fetchOMDBMovie, fetchMovieTrailer } from '../../actions/movie_actions';
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
    updateRating: (id, rating) => dispatch(updateRating(id, rating)),
    fetchMovieTrailer: (title, year) => dispatch(fetchMovieTrailer(title, year))
});


export default connect(mapStateToProps, mapDispatchToProps)(MoviePopUp);