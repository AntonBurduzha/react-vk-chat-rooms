import AppActionTypes from '../actions/action.types'

const userReducer = (state = {}, action) => {
  switch(action.type){
    case AppActionTypes.SET_VK_USER_DATA:
      return Object.assign({}, action.data);
    default:
      return state;
  }
};

export default userReducer;