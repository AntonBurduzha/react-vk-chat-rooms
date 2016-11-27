const userApi = {};

userApi.getChatList = getChatList;
userApi.getSearchedChatList = getSearchedChatList;

function getChatList() {
  return fetch('/userdata/chatlist', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => response.json())
}

function getSearchedChatList(chatNameReg) {
  return fetch(`/userdata/chatlist/${chatNameReg}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => response.json())
}

export default userApi;