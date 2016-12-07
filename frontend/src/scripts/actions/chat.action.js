import AppActionTypes from './action.types'

const setCurrentChatMsg = (dispatch, msgList) => {
  dispatch( {
    type: AppActionTypes.GET_CURRRENT_CHAT_MSG,
    msgList
  });
};

const setCurrentChatMsgData = (dispatch, msgData) => {
  dispatch( {
    type: AppActionTypes.SET_CURRRENT_CHAT_MSG_DATA,
    msgData
  });
};

export {
  setCurrentChatMsg,
  setCurrentChatMsgData
};