import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';

function tasks(state = [], action) {
  switch (action.type) {
    case 'ADD_TASK':
      const {item, id} = action;
      const is_complete = false;
      return [...state, { item, id, is_complete }];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.id);
    case 'SET_COMPLETE_TASK':
      return state.filter(task => {
        console.log('complete id ' + action.id);
        if (task.id === action.id) {
          task.is_complete = action.is_complete;
        }
        return task;
      })
    default: 
      return state;
  }
}

let store = createStore(tasks);

let task_id = 0;
const addTask = (item) => {
  store.dispatch({
    type: 'ADD_TASK',
    item,
    id: task_id
  });
  task_id++;
}
const deleteTask = (id) => {
  store.dispatch({
    type: 'DELETE_TASK',
    id
  });
}
const setCompleteTask = (id, is_complete) => {
  store.dispatch({
    type: 'SET_COMPLETE_TASK',
    is_complete,
    id
  });
}

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App tasks={store.getState()} addTask={addTask} deleteTask={deleteTask} setCompleteTask={setCompleteTask} />
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
