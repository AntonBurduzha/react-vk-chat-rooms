import { combineReducers } from 'redux';
import loginReducer from './login.reducer'
import chatListReducer from './user.reducer'

let reducers = combineReducers({
  loginState: loginReducer,
  chatListState: chatListReducer
});

export default reducers;