import AppActionTypes from './action.types'

const getDefaultChatList = (dispatch, chatListData) => {
  dispatch( {
    type: AppActionTypes.GET_DEFAULT_CHAT_LIST,
    chatListData
  });
};

export {
  getDefaultChatList
};