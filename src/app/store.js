import { createStore, combineReducers } from 'redux';
import feed from '../features/feed/feedSlice'
import users from '../features/user/userSlice'

const rootReducer = combineReducers({feed, users});
const store = createStore(rootReducer)
export default store;