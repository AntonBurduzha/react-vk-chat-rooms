import AppActionTypes from './action.types'

const getDefaultChatList = (chatListData) => {
  return {
    type: AppActionTypes.GET_DEFAULT_CHAT_LIST,
    chatListData
  };
};

export {
  getDefaultChatList
};