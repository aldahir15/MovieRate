import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';



class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAnchorClick = this.handleAnchorClick.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);

    this.state = {username: this.props.user.username,
                  password: this.props.user.password,
                  email: this.props.user.email,
                  signedUp: false,
                  text: this.props.text,
                  errors: []};
  }

  componentDidUpdate(props) {
    if (this.props.errors.length != this.state.errors.length) {
      this.setState({["errors"]: this.props.errors});
    }
  }

  componentWillUnmount() {
    this.setState({ ["errors"]: [] });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  update(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleAnchorClick() {
    if (this.state.text === "Log In") {
      this.setState({ ["text"]: "Sign Up" });
    } else {
      this.setState({ ["text"]: "Log In" });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    let sendingState = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    this.props.action(sendingState);
    if (this.state.text === "Sign Up") {
      this.setState({ ["signedUp"]: true });
      console.log(this.state);
    }
  }

  responseGoogle(response) {
    console.log("THIS IS ULTRA INSTINCT");
    console.log(response);

    if (response.profileObj && response.profileObj.email) {
      let sendingState = {};
      if (this.state.text === "Sign Up") {
        sendingState = {
          username: response.profileObj.givenName + Math.round(10000 * Math.random()),
          password: response.tokenId,
          email: response.profileObj.email,
          email_confirmed: true
        };
      } else {
        sendingState = {
          email: response.profileObj.email,
          email_confirmed: true,
          from_google: true
        };
      }
      this.props.action(sendingState);
      if (this.state.text === "Sign Up") {
        this.setState({ ["signedUp"]: true });
        console.log(this.state);
      }
    } else {
      console.log("FALSE");
    }
  }

  showErrors() {
    return(
      <ul className="errors-messages">
        {this.props.errors.map((error) => (
          <li>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  showMainContent() {
    if (this.state.text === "Log In") {
      return (
        <div className="session-form-inner-div">
          <form onSubmit={this.handleSubmit} className="session-form">
            {this.showErrors()}
            <GoogleLogin
              clientId="906176886161-ovnaadougov32ak5klveg3i21rvfum87.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="google-button"
            />
            <label className="session-label">Username</label>
            <input type="text" onChange={this.update("username")}
              placeholder="Username" className="session-inputs" value={this.state.username} />
            <div className="height-divider"></div>
            <label className="session-label">Password</label>
            <input type="password" onChange={this.update("password")}
              placeholder="Password" className="session-inputs" value={this.state.password} />
            <div className="height-divider"></div>
            <input type="submit" value="Submit" className="submit-session" />
          </form>
        </div>
      )
    } else if (this.state.signedUp) {
      return (
        <div className="session-form-inner-div">
          <div className="signed-up-message">
            <div>Thank you for signing up, </div>
            <div>you should recieve an email to {this.state.email} shortly</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="session-form-inner-div">
          <form onSubmit={this.handleSubmit} className="session-form">
            {this.showErrors()}
            <GoogleLogin
              clientId="906176886161-ovnaadougov32ak5klveg3i21rvfum87.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="google-button"
            />
            <label className="session-label">Email</label>
            <input type="text" onChange={this.update("email")}
              placeholder="Email" className="session-inputs" value={this.state.email} />
            <div className="height-divider"></div>
            <label className="session-label">Username</label>
            <input type="text" onChange={this.update("username")}
              placeholder="Username" className="session-inputs" value={this.state.username} />
            <div className="height-divider"></div>
            <label className="session-label">Password</label>
            <input type="password" onChange={this.update("password")}
              placeholder="Password" className="session-inputs" value={this.state.password} />
            <div className="height-divider"></div>
            <input type="submit" value="Submit" className="submit-session" />
          </form>
        </div>
      )      
    }
  }

  showFooter() {
    if (this.state.text === "Log In") {
      return (
        <div className="session-footer">
          <div className="session-footer-message">
            <p>To create an account, <a onClick={this.handleAnchorClick}>click here</a></p>
            </div>
        </div>
      );
    } else {
      return (
        <div className="session-footer">
          <div className="session-footer-message">
            <p>To Log In, <a onClick={this.handleAnchorClick}>click here</a></p>
            </div>
        </div>
      );     
    }
  }


  render(){
      return (
        <div className="session-form-div" id={this.state.text === "Sign Up" ? "sign-up" : ""}>
        <div className="session-form-inner-div">
         <h1>{this.state.text}</h1>
        </div>
        {this.showMainContent()}
        {this.showFooter()}
        </div>
      );
    }

}

export default SessionForm;