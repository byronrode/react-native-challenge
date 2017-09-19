import { combineReducers } from 'redux';
//import custom reducers here
import TasksReducer from './TasksReducer';

//export and assign reducers to the store
export default combineReducers({
  tasksData: TasksReducer,
});