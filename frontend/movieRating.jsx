import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/store.js";
import Root from './components/root.jsx';




document.addEventListener("DOMContentLoaded", () => {
  let store;
  store = configureStore();

  // const root = document.getElementById('root');
  // ReactDOM.render(<Root store={store} />, root);

  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    const preloadedState = { session: { currentUser: null } };
    store = configureStore(preloadedState);
  }
  // window.fetchPaths = fetchPaths;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});


