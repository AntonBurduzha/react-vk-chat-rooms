import AppActionTypes from './action.types'

const setVkUserId = (id) => {
  return {
    type: AppActionTypes.SET_VK_USER_ID,
    id
  };
};

const setVkUserData = (data) => {
  return {
    type: AppActionTypes.SET_VK_USER_DATA,
    data
  };
};

export {
  setVkUserId,
  setVkUserData
};