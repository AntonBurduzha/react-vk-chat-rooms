import AppActionTypes from './action.types'

const getDefaultChatList = (chatListData) => {
  return {
    type: AppActionTypes.GET_DEFAULT_CHAT_LIST,
    chatListData
  };
};

const getSearchedChatList = (chatListData) => {
  return {
    type: AppActionTypes.GET_SERCHED_CHAT_LIST,
    chatListData
  };
};

export {
  getDefaultChatList,
  getSearchedChatList
};