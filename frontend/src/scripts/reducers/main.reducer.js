import { combineReducers } from 'redux';
import loginReducer from './login.reducer'
import chatListReducer from './user.reducer'
import chatReducer from './chat.reducer'

let reducers = combineReducers({
  loginState: loginReducer,
  chatListState: chatListReducer,
  chatState: chatReducer
});

export default reducers;