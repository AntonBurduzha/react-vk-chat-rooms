const getCurrentChatMsg = chatName =>{
  return fetch(`/userdata/chat/${chatName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
};

const postCurrentChatMsg = msgData => {
  fetch('/userdata/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: msgData
  }).then(response => response.json())
};

export {
  getCurrentChatMsg,
  postCurrentChatMsg
};