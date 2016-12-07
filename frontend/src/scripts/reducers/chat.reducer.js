import AppActionTypes from '../actions/action.types'

const chatReducer = (state = [], action) => {
  switch(action.type){
    case AppActionTypes.GET_CURRRENT_CHAT_MSG:
      return [...action.msgList];
    case AppActionTypes.SET_CURRRENT_CHAT_MSG_DATA:
      return [...state, action.msgData];
    default:
      return state;
  }
};

export default chatReducer;