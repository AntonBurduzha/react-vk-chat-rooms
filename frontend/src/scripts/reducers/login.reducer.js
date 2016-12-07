import AppActionTypes from '../actions/action.types'

const loginReducer = (state = '', action) => {
  switch(action.type){
    case AppActionTypes.SET_VK_USER_ID:
      return action.id;
    default:
      return state;
  }
};

export default loginReducer;