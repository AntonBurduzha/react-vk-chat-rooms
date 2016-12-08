const userService = {};
userService.getUserData = getUserData;
userService.postUserData = postUserData;
userService.postNewChatData = postNewChatData;
userService.removeChat = removeChat;

function getUserData(req) {
  const db = req.db;
  let collection = db.get('users');
  let userdata = {};
  return new Promise((resolve, reject) => {
    collection.findOne({id: req.params.id}, (err, userInfo) => {
      if(err) throw err;
      userdata.userInfo = userInfo;
      resolve(userdata);
    });
  });
}

function postUserData(req) {
  const db = req.db;
  var collection = db.get('users');
  var userdata = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    domain: req.body.domain,
    photo_50: req.body.photo_50,
    photo_200: req.body.photo_200
  };
  collection.insert(userdata);
  return userdata;
}

function postNewChatData(req) {
  const db = req.db;
  var collection = db.get('chatroom');
  var newChatData = {
    id: req.body.id,
    name: req.body.name,
    logo: req.body.logo,
    owner: req.body.owner,
    members: [],
    messages: []
  };
  collection.insert(newChatData);
  return newChatData;
}

function removeChat(req) {
  const db = req.db;
  var collection = db.get('chatroom');
  let name = req.body.chatName;
  collection.remove({name: name});
  return name;
}

module.exports = userService;