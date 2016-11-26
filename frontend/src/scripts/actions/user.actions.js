import AppActionTypes from './action.types'

const userActions = {};
userActions.getDefaultChatList = getDefaultChatList;

function getDefaultChatList(chatListData) {
  return {
    type: AppActionTypes.GET_DEFAULT_CHAT_LIST,
    payload: chatListData
  };
}

export default userActions;