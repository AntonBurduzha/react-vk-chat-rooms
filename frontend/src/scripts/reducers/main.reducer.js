import { combineReducers } from 'redux';
import loginReducer from './login.reducer'

let reducers = combineReducers({
  loginState: loginReducer
});

export default reducers;