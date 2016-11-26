const userApi = {};

userApi.getChatList = getChatList;

function getChatList() {
  return fetch('/userdata/chatlist', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => response.json())
}

export default userApi;