import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers } from 'redux';

// REDUCERS

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
        if (task.id === action.id) {
          task.is_complete = action.is_complete;
        }
        return task;
      })
    default: 
      return state;
  }
}

function taskFilter(state = 'ALL', action) {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const taskLoop = combineReducers({tasks, taskFilter});
let store = createStore(taskLoop);

// ACTION CREATORS

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
const setFilter = (filter) => {
  store.dispatch({
    type: 'SET_FILTER',
    filter
  })
}

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App tasks={store.getState().tasks} filter={store.getState().taskFilter} setFilter={setFilter} addTask={addTask} deleteTask={deleteTask} setCompleteTask={setCompleteTask} />
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
