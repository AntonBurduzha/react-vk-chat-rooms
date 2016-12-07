import { combineReducers } from 'redux';
import loginReducer from './login.reducer'
import chatListReducer from './chat.list.reducer'
import chatReducer from './chat.reducer'
import userReducer from './user.reducer'

let reducers = combineReducers({
  loginState: loginReducer,
  chatListState: chatListReducer,
  chatState: chatReducer,
  userState: userReducer
});

export default reducers;