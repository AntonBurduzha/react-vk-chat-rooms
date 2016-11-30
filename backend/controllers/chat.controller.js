const express = require('express');
const router = express.Router();
const chatService = require('../services/chat.service.js');

router.get('/chat/:id', getChatMsg);
router.post('/chat', postChatMsg);

function postChatMsg(req, res) {
  const result = chatService.postChatMsg(req);
  if (result || result === 0) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
}

function getChatMsg(req, res) {
  chatService.getChatMsg(req).then((response) => {
    if (response || response === 0) {
      res.json(response);
    } else {
      res.sendStatus(404);
    }
  });
}

module.exports = router;