import { createStore } from 'redux';
import items from '../features/feed/itemsSlice'

const rootReducer = items;
const store = createStore(rootReducer)
export default store;