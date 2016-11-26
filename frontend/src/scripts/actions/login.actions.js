import AppActionTypes from './action.types'

const loginActions = {};
loginActions.setVkUserId = setVkUserId;
loginActions.setVkUserData = setVkUserData;

function setVkUserId(id) {
  return {
    type: AppActionTypes.SET_VK_USER_ID,
    payload: id
  };
}

function setVkUserData(data) {
  return {
    type: AppActionTypes.SET_VK_USER_DATA,
    payload: data
  };
}

export default loginActions;