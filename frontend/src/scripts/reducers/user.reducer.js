const chatListReducer = (state = [], action) => {
  switch(action.type){
    case 'GET_DEFAULT_CHAT_LIST':
      return [...action.payload];
    default:
      return state;
  }
};

export default chatListReducer;