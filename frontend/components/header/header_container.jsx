import { connect } from 'react-redux';
import Header from './header';
import { login, logout } from '../../actions/session_actions';

const mapStateToProps = (state) => {
  // console.log(state);
//   const user = state.session ? state.session.currentUser : null;
  const user = state.session.currentUser;
  const errors = state.errors;
  return {
    user,
    errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);