import { combineReducers } from 'redux';

// Action creators
let item_id = 0;
export const addTask = (title) => {
  const action = {
    type: 'ADD_ITEM',
    item_type: 'TASK',
    title,
    status: 'NEW',
    id: item_id
  };
  item_id++;
  return action;
}
export const deleteItem = (id) => {
  return {
    type: 'DELETE_ITEM',
    id
  };
}
export const setItemStatus = (id, status) => {
  return {
    type: 'SET_ITEM_STATUS',
    status,
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
function items(state = [], action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const {item_type, title, status, id} = action;
      return [...state, { item_type, title, status, id }];
    case 'DELETE_ITEM':
      return state.filter(item => item.id !== action.id);
    case 'SET_ITEM_STATUS':
      return state.filter(item => {
        if (item.id === action.id) {
          item.status = action.status;
        }
        return item;
      })
    default: 
      return state;
  }
}

function itemFilter(state = 'ALL', action) {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const reducer = combineReducers({items, itemFilter});
export default reducer;