import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      const {item, id} = action;
      return [...state, { item, id }];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default: 
      return state;
  }
}

let store = createStore(todos);

let todo_id = 0;
const addTodo = (item) => {
  store.dispatch({
    type: 'ADD_TODO',
    item,
    id: todo_id
  });
  todo_id++;
}
const removeTodo = (id) => {
  store.dispatch({
    type: 'REMOVE_TODO',
    id
  });
}


const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App todos={store.getState()} addTodo={addTodo} removeTodo={removeTodo} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
