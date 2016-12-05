const getChatList = () => {
  return fetch('/userdata/chatlist', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => response.json())
};

const getSearchedChatList = chatNameReg => {
  return fetch(`/userdata/chatlist/${chatNameReg}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => response.json())
};

const getMyChatList = userId => {
  return fetch(`/userdata/mychatlist/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => response.json())
};

const postNewChat = chatData => {
  fetch('/userdata/create_chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: chatData
  }).then(response => response.json())
};

export {
  getChatList,
  getSearchedChatList,
  getMyChatList,
  postNewChat
};