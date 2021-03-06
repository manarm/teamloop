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
const init_users = [
  {
    name: 'madison',
    role: 'TEAM',
    notes_author: [],
    notes_assigned: [],
    id: 0
  },
  {
    name: 'sam',
    role: 'TEAM',
    notes_author: [],
    notes_assigned: [],
    id: 1
  }
]
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
    case 'SET_USERS':
      return action.users;
    default: 
      return state;
  }
}

export const login = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}
export const logout = () => {
  return {
    type: 'LOGOUT',
  };
}

function currentUser(state = null, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.user;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
}

const reducer = combineReducers({users, currentUser});
export default reducer;