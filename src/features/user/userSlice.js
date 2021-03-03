import { combineReducers } from 'redux';

// Action creators
let user_id = 1; // user 0 is dummy user
export const addUser = (name) => {
  const action = {
    type: 'ADD_USER',
    name,
    role: 'TEAM',
    notes_author: [],
    notes_assigned: [],
    id: user_id
  };
  user_id++;
  return action;
}
export const addUserNoteAuthor = (user_id, note_id) => {
  return {
    type: 'ADD_USER_NOTE_AUTHOR',
    user_id,
    note_id
  };
}
export const addUserNoteAssigned = (user_id, note_id) => {
  return {
    type: 'ADD_USER_NOTE_ASSIGNED',
    user_id,
    note_id
  }
}

// Reducers
// Dummy user
const init_users = [{
  name: 'manarm',
  role: 'TEAM',
  notes_author: [],
  notes_assigned: [],
  id: 0
}]
function users(state = init_users, action) {
  const { type, ...rest } = action;
  switch (type) {
    case 'ADD_USER':
      return [...state, { ...rest }];
    case 'ADD_USER_NOTE_AUTHOR':
      return state.map(user => {
        if(user.id === action.user_id) {
          user.notes_author.push(action.array_id);
        }
        return user;
      });
    case 'ADD_USER_NOTE_ASSIGNED':
      return state.map(user => {
        if(user.id === action.user_id) {
          user.notes_assigned.push(action.array_id);
        }
        return user;
      });
    default: 
      return state;
  }
}

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}

function currentUser(state = 'manarm', action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.user;
    default:
      return state;
  }
}

const reducer = combineReducers({users, currentUser});
export default reducer;