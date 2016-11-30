const chatReducer = (state = [], action) => {
  switch(action.type){
    case 'GET_CURRRENT_CHAT_MSG':
      return [...action.msgList];
    default:
      return state;
  }
};

export default chatReducer;