import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import Home from '../features/feed/Home';

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
    <Home />
  </Provider>
  );
}

export default App;
