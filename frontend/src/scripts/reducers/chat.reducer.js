const chatReducer = (state = [], action) => {
  switch(action.type){
    case 'GET_CURRRENT_CHAT_MSG':
      return [...action.msgList];
    case 'SET_CURRRENT_CHAT_MSG_DATA':
      return [...state, action.msgData];
    default:
      return state;
  }
};

export default chatReducer;