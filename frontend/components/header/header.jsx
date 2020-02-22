import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import LoginModal from './loginModal';
import SigninFormContainer from '../session_form/signin_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import HomeModal from '../home/home_modal';
import MovieContainer from '../movie/movie_container';




class Header extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(){
    this.props.logout();
  }

  loggedin(){
    return (
      <div className="loggedIn-home-header">
        <div className="HomeHeader">
          <div className="left-login-header">
            <h1>Movie Rates</h1>
            <div class="left-login-buttons">
              <ul className="login-ul-nav">
                <Link to="/home" className="home-button"><p className="nav-items">Home</p></Link>
              </ul>
            </div>
          </div>
          <HomeModal action={MovieContainer} />
        </div>
        <div className="logout-and-name">
          <p className="hello-user">HELLO {this.props.user.username}</p>
          <div className="login-divider"></div>
          <div className="login-divider2"></div>
          <div className="button-container">
            <Link to="#" className="log-out-button" onClick={this.logout}>Log Out</Link>
          </div>
        </div>
      </div>
    );
  }

  loggedout(){
    return (
      <div className="login-header">
        <LoginModal action={SigninFormContainer} className="login-button" id="header-button"/>
        <div className="login-divider"></div>
        <LoginModal action={SignupFormContainer} className="signup-button" id="header-button"/>
      </div>
    );
  }

  render(){
    return this.props.user ? this.loggedin() : this.loggedout();
  }
}
export default Header;

//onClick={() =>
//  this.props.login({username: "demo", password: "password"})}

{/* <div className="logout-header">
  <div>
    <ul className="login-ul-nav">
      <Link to="/home" className="home-button"><p>Home</p></Link>
    </ul>
  </div>
  <div className="logout-and-name">
    <p className="hello-user">HELLO {this.props.user.username}</p>
    <div className="login-divider"></div>
    <div className="button-container">
      <Link to="#" className="log-out-button" onClick={this.logout}>Log Out</Link>
    </div>
  </div>
</div> */}