import AppActionTypes from './action.types'

const setVkUserId = (dispatch, id) => {
  dispatch( {
    type: AppActionTypes.SET_VK_USER_ID,
    id
  });
};

const setVkUserData = (dispatch, data) => {
  dispatch( {
    type: AppActionTypes.SET_VK_USER_DATA,
    data
  });
};

export {
  setVkUserId,
  setVkUserData
};