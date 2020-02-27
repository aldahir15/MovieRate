import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {username: this.props.user.username,
                  password: this.props.user.password};
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

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state);
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

  showFooter() {
    if (this.props.text === "Log In") {
      return (
        <div className="session-footer">
          <div className="session-footer-message">
            <p>To create an account, <a href="" target="_blank">click here</a></p>
            </div>
        </div>
      );
    } else {
      return (
        <div className="session-footer">
          <div className="session-footer-message">
            <p>To Log In, <a href="" target="_blank">click here</a></p>
            </div>
        </div>
      );     
    }
  }


  render(){
      return (
        <div className="session-form-div">
        <div className="session-form-inner-div">
         <h1>{this.props.text}</h1>
        </div>
        <div className="session-form-inner-div">
          <form onSubmit={this.handleSubmit} className="session-form">
          {this.showErrors()}
          <label className="session-label">Username</label>
          <input type="text" onChange={this.update("username")}
          placeholder="Username" className="session-inputs" value={this.state.username} />
          <div className="height-divider"></div>
          <label className="session-label">Password</label>
          <input type="password" onChange={this.update("password")}
          placeholder="Password" className="session-inputs" value={this.state.password} />
          <div className="height-divider"></div>
          <input type="submit" value="Submit" className="submit-session"/>
          </form>
        </div>
        {this.showFooter()}
        </div>
      );
    }

}

export default SessionForm;