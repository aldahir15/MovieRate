import { connect } from 'react-redux';
import MovieLists from './movie_lists.jsx';
import { fetchMovieLists } from '../../actions/list_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  const user = state.session;
  const lists = state.lists;
  const list = state.list;
  return {
    user,
    lists,
    list
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMovieLists: (id) => dispatch(fetchMovieLists(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieLists);