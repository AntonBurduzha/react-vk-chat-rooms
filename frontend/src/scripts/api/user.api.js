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

export {
  getChatList,
  getSearchedChatList
};