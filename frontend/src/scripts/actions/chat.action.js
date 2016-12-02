import AppActionTypes from './action.types'

const setCurrentChatMsg = msgList => {
  return {
    type: AppActionTypes.GET_CURRRENT_CHAT_MSG,
    msgList
  };
};

const setCurrentChatMsgData = msgData => {
  return {
    type: AppActionTypes.SET_CURRRENT_CHAT_MSG_DATA,
    msgData
  };
};

export {
  setCurrentChatMsg,
  setCurrentChatMsgData
};