import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import feed from '../features/feed/feedSlice';
import users from '../features/user/userSlice';

const rootReducer = combineReducers({feed, users});
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
export default store;