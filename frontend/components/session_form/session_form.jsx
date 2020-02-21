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


  render(){
      return (
        <div className="session-form-div">
        <div className="session-exit-button-container">
        <img src = 'http://res.cloudinary.com/ddgt25kwb/image/upload/c_scale,w_54/v1506464706/9982_23980_cancel_close_exit_1_p3x21t.png'
        onClick={this.props.closeModal}></img>
        </div>
        <h1>{this.props.text}</h1>
        <form onSubmit={this.handleSubmit} className="session-form">
        {this.showErrors()}
        <input type="text" onChange={this.update("username")}
        placeholder="Username" className="session-inputs" value={this.state.username} />
        <div className="height-divider"></div>
        <input type="password" onChange={this.update("password")}
        placeholder="Password" className="session-inputs" value={this.state.password} />
        <div className="height-divider"></div>
        <input type="submit" value="Submit" className="submit-session"/>
        </form>
        </div>
      );
    }

}

export default SessionForm;