const searchReducer = (state = [], action) => {
  switch(action.type){
    case 'GET_SERCHED_CHAT_LIST':
      return [...action.chatListData];
    default:
      return state;
  }
};

export default searchReducer;