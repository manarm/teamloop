import { combineReducers } from 'redux';

// Action creators
let task_id = 0;
export const addTask = (item) => {
  const action = {
    type: 'ADD_TASK',
    item,
    id: task_id
  };
  task_id++;
  return action;
}
export const deleteTask = (id) => {
  return {
    type: 'DELETE_TASK',
    id
  };
}
export const setCompleteTask = (id, is_complete) => {
  return {
    type: 'SET_COMPLETE_TASK',
    is_complete,
    id
  };
}
export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  };
}

// Reducers
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

const reducer = combineReducers({tasks, taskFilter});
export default reducer;