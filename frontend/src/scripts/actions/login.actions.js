import AppActionTypes from './action.types'

export default function setVkUserData(data) {
  return {
    type: AppActionTypes.SET_VK_USER_DATA,
    payload: data
  };
}