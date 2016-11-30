const chatService = {};
chatService.getChatMsg = getChatMsg;
chatService.postChatMsg = postChatMsg;

function postChatMsg(req) {
  const db = req.db;
  var collection = db.get('chatroom');
  var msgData = {
    photo_50: req.body.photo_50,
    first_name: req.body.first_name,
    date: req.body.date,
    domain: req.body.domain,
    text: req.body.text
  };
  let name = req.body.chatName;
  collection.update({name: name}, {$push: {messages: msgData}});
  return msgData;
}

function getChatMsg(req) {
  const db = req.db;
  let collection = db.get('chatroom');
  let chatMsgList = {};
  return new Promise((resolve, reject) => {
    collection.findOne({name: req.params.id}, (err, currChatData) => {
      if(err) throw err;
      chatMsgList = currChatData.messages;
      resolve(chatMsgList);
    });
  });
}


module.exports = chatService;