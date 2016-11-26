const loginService = {};

loginService.createUser = createUser;
loginService.getUserData = getUserData;
loginService.getChatList = getChatList;

module.exports = loginService;

function getChatList(req) {
  const db = req.db;
  let collection = db.get('chatroom');
  let chatlist = {};
  return new Promise((resolve, reject) => {
    collection.find({}, (err, chatRoomList) => {
      if(err) throw err;
      chatlist.chatRoomList = chatRoomList;
      resolve(chatlist);
    });
  });
}

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


function createUser(req) {
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