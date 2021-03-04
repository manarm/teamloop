import { combineReducers } from 'redux';

// Utilities
// Status state machine, unique per-type.
// type => status => [verb, nextStatus]
export const getNextStatus = (item) => {
  const typeMap = {
    'THOUGHT': {
      'NEW' : {
        verb: 'Acknowledge',
        nextStatus: 'COMPLETE'
      }
    },
    'TASK': {
      'NEW' : {
        verb: 'Accept',
        nextStatus: 'IN_PROGRESS'
      },
      'IN_PROGRESS' : {
        verb: 'Complete',
        nextStatus: 'COMPLETE'
      },
      'COMPLETE': {
        verb: 'Re-open',
        nextStatus: 'IN_PROGRESS'
      }
    },
    'QUESTION': {
      'NEW' : {
        verb: 'Answer',
        nextStatus: 'COMPLETE'
      }
    }
  };
  
  if(!typeMap.hasOwnProperty(item.item_type)) {
    console.warn('getNextStatus called on type that DNE.');
    return null;
  }

  const statusMap = typeMap[item.item_type];
  if(!statusMap.hasOwnProperty(item.status)) {
    // This is okay -- some states are dead ends.
    return null;
  }
  return statusMap[item.status];
}

// Action creators
let item_id = 0;
export const addTask = (title, author, assigned_to) => {
  const action = {
    type: 'ADD_ITEM',
    item_type: 'TASK',
    title,
    status: 'NEW',
    author,
    assigned_to,
    description: 'task description',
    id: item_id
  };
  item_id++;
  return action;
}
export const addThought = (title, author, assigned_to) => {
  const action = {
    type: 'ADD_ITEM',
    item_type: 'THOUGHT',
    title,
    status: 'NEW',
    author,
    assigned_to,
    description: 'thought description',
    id: item_id
  };
  item_id++;
  return action;
}
export const addQuestion = (title, author, assigned_to) => {
  const action = {
    type: 'ADD_ITEM',
    item_type: 'QUESTION',
    title,
    status: 'NEW',
    answerIsYes: null,
    author,
    assigned_to,
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
export const answerQuestion = (id, answerIsYes) => {
  return {
    type: 'ANSWER_QUESTION',
    answerIsYes,
    id
  }
}

// Reducers
function items(state = [], action) {
  const {type, ...rest} = action;
  switch (type) {
    case 'ADD_ITEM':
      return [...state, { ...rest }];
    case 'DELETE_ITEM':
      return state.filter(item => item.id !== action.id);
    case 'SET_ITEM_STATUS':
      return state.filter(item => {
        if (item.id === action.id) {
          item.status = action.status;
        }
        return item;
      })
    case 'ANSWER_QUESTION':
      return state.filter(item => {
        if (item.id === action.id) {
          item.answerIsYes = action.answerIsYes;
        }
        return item;
      })
    case 'SET_ITEMS':
      return action.items;
    default: 
      return state;
  }
}

function itemFilter(state = 'INBOX', action) {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const reducer = combineReducers({items, itemFilter});
export default reducer;