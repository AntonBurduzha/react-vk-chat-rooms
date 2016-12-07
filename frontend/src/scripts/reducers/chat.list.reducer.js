import AppActionTypes from '../actions/action.types'

const chatListReducer = (state = [], action) => {
  switch(action.type){
    case AppActionTypes.GET_DEFAULT_CHAT_LIST:
      return [...action.chatListData];
    default:
      return state;
  }
};

export default chatListReducer;