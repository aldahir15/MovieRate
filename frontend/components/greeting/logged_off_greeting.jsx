import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Parallax } from 'react-parallax';
import ReactDOM from 'react-dom';
import HeaderContainer from '../header/header_container';



class Greeting extends React.Component {
  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

  }

  componentDidMount(){
    if (!this.props.user) {
      window.addEventListener("scroll", this.handleScroll);
    }
    // window.removeEventListener("scroll", this.handleScroll);
    const title = document.querySelector(".logo-title-h3");
    title.style.opacity = "100%"
    console.log(title);
  }

  handleScroll(){
    if (document.getElementsByClassName("scroll-login-header")[0]) {
      if (document.body.scrollTop > 881 || document.documentElement.scrollTop > 881) {
        // document.getElementsByClassName("scroll-login-header")[0].style.display = "flex";
        document.getElementsByClassName("scroll-login-header")[0].style.transform = "translate3d(0px, -160%, 0px)";
      } else {
        // document.getElementsByClassName("scroll-login-header")[0].style.display = "none";
        document.getElementsByClassName("scroll-login-header")[0].style.transform = "translate3d(0, -300%, 0)";
      }
    }
  }

  render(){
    return (
    <div>
      <Parallax>
        <div className="login-img-div">
          <div className="logo-img">
            <h3 className="logo-title-h3">Movie Rates</h3>
          </div>
        </div>
      </Parallax>
    </div>);
  }
}
export default Greeting;
