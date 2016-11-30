import AppActionTypes from './action.types'

const setCurrentChatMsg = (msgList) => {
  return {
    type: AppActionTypes.GET_CURRRENT_CHAT_MSG,
    msgList
  };
};

export {
  setCurrentChatMsg
};