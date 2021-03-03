import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import Home from '../features/feed/Home';
import LogIn from '../features/user/LogIn';
import {login} from '../features/user/userSlice';

class App extends React.Component {
  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render = () => (
  <Provider store={store}>
    { store.getState().users.currentUser === null ? 
      <LogIn login={ () => {store.dispatch(login('manarm'))} }/> :
      <Home /> 
    }
  </Provider>
  );
}

export default App;
