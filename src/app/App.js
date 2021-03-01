import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import Tasks from '../features/tasks/Tasks';

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
    <Tasks />
  </Provider>
  );
}

export default App;
