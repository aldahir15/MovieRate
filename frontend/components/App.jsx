import React from 'react';
import { Provider } from 'react-redux';
import { Link, Switch } from 'react-router-dom';
import MovieContainer from './movie/movie_container.jsx';
import HomeContainer from './home/home_container.jsx';
import { Route } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/create" component={MovieContainer} />
        <Route exact path="/" component={HomeContainer} />
      </Switch>
    </div>
  );
};

export default App;