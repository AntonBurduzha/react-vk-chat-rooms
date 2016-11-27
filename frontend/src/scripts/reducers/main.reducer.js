import { combineReducers } from 'redux';
import loginReducer from './login.reducer'
import chatListReducer from './user.reducer'
import searchReducer from './search.reducer'

let reducers = combineReducers({
  loginState: loginReducer,
  chatListState: chatListReducer,
  searchState: searchReducer
});

export default reducers;