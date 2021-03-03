import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import Home from '../features/feed/Home';
import LogIn from '../features/user/LogIn';

class App extends React.Component {
  componentDidMount = () => {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render = () => {
    return (<Provider store={store}>
      { store.getState().users.currentUser === null ? 
        <LogIn /> :
        <Home /> 
      }
    </Provider>
  )};
}

export default App;
