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
        verb: 'Finish',
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
// Item fetch from backend
export const setItemFetchError = (isError) => {
  return {
    type: 'ITEM_FETCH_ERROR',
    isError
  }
}
export const setItemFetchLoading = (isLoading) => {
  return {
    type: 'ITEM_FETCH_LOADING',
    isLoading
  }
}
export const itemFetchSuccess = (items) => {
  return {
    type: 'SET_ITEMS',
    items
  }
}
export const itemFetch = (url) => {
  return (dispatch) => {
    console.log("begin itemFetch");
    dispatch(setItemFetchLoading(true));
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('received data ' + data);
      const items = data.map(item => {
        item.date_created = new Date(item.date_created);
        if(item.date_completed) {
          item.date_completed = new Date(item.date_completed);
        }
        return item;
      })
      dispatch(setItemFetchLoading(false));
      dispatch(itemFetchSuccess(items));
    })
    .catch(error => {
      console.log(error);
      dispatch(setItemFetchLoading(false));
      dispatch(setItemFetchError(true));
    });
  }
}


let item_id = 0;
const getNextItemAction = (item_type, title, author, assigned_to, description) => {
  const action = {
    type: 'ADD_ITEM',
    item_type,
    title,
    status: 'NEW',
    author,
    assigned_to,
    description,
    date_created: new Date(),
    date_completed: null,
    id: item_id
  }
  item_id++;
  return action;
}
export const addItem = ({item_type, title, author, assigned_to, description}) => {
  return { 
    ...getNextItemAction(item_type, title, author, assigned_to, description), 
  };
}
export const deleteItem = (id) => {
  return {
    type: 'DELETE_ITEM',
    id
  };
}
export const setItemStatus = (id, status) => {
  const getDate = () => {
    if(status === 'COMPLETE') {
      return new Date();
    } else {
      // Automatically nulls date_completed for re-opened items.
      return null;
    }
  }
  return {
    type: 'SET_ITEM_STATUS',
    status,
    date_completed: getDate(),
    id
  };
}
export const answerQuestion = (id, answer) => {
  return {
    type: 'ANSWER_QUESTION',
    answer,
    id
  }
}
export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  };
}
export const setSort = (sort) => {
  return {
    type: 'SET_SORT',
    sort
  };
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
          item.date_completed = action.date_completed
        }
        return item;
      })
    case 'ANSWER_QUESTION':
      console.log('redux answer ' + action.answer);
      return state.filter(item => {
        if (item.id === action.id) {
          item.answer = action.answer;
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

function itemSort(state='TITLE', action) {
  switch(action.type) {
    case 'SET_SORT':
      return action.sort;
    default:
      return state;
  }
}

function itemFetchError(state=false, action) {
  switch(action.type) {
    case 'ITEM_FETCH_ERROR':
      return action.isError;
    default: 
      return state;
  }
}

function itemFetchLoading (state=false, action) {
  switch(action.type) {
    case 'ITEM_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

const reducer = combineReducers({items, itemFilter, itemSort, itemFetchLoading, itemFetchError});
export default reducer;