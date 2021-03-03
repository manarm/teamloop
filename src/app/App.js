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


  render = () => {
    const { users } = store.getState();

    const handleLogin = user => {
      store.dispatch(login(user))
    }

    return (<Provider store={store}>
      { users.currentUser === null ? 
        <LogIn users={users.users} login={handleLogin}/> :
        <Home /> 
      }
    </Provider>
  )};
}

export default App;
