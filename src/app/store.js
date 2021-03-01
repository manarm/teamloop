import { createStore } from 'redux';
import tasks from '../features/tasks/tasksSlice'

const rootReducer = tasks;
const store = createStore(rootReducer)
export default store;