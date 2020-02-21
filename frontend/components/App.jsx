import React from 'react';
import { Provider } from 'react-redux';
import { Link, Switch } from 'react-router-dom';
import {RequireLoginRoute, LoggedinRoute} from '../util/authorization_util';
import MovieContainer from './movie/movie_container.jsx';
import HomeContainer from './home/home_container.jsx';
import { Route } from 'react-router-dom';
import HeaderContainer from './header/header_container';
import GreetingContainer from './greeting/greeting_container';



const App = () => {
  return (
    <div className = "app-div">
      <HeaderContainer />
      <Switch>
        <LoggedinRoute exact path="/create" component={MovieContainer} />
        <LoggedinRoute exact path="/home" component={HomeContainer} />
        <RequireLoginRoute exact path="/" component={GreetingContainer} />  
      </Switch>
    </div>
  );
};

export default App;