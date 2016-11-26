const loginApi = {};

loginApi.getUserData = getUserData;
loginApi.postUserData = postUserData;

function getUserData(userId){
  return fetch(`/userdata/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

function postUserData(data) {
   fetch('/userdata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  });
}

export default loginApi;