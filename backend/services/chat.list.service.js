const chatListService = {};
chatListService.getChatList = getChatList;
chatListService.getSearchedChatList = getSearchedChatList;

function getSearchedChatList(req) {
  const db = req.db;
  let collection = db.get('chatroom');
  let chatlist = {};
  return new Promise((resolve, reject) => {
    collection.find({name: {$regex: req.params.id}}, (err, chatRoomList) => {
      if(err) throw err;
      chatlist = chatRoomList;
      resolve(chatlist);
    });
  });
}

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

module.exports = chatListService;