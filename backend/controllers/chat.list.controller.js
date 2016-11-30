const express = require('express');
const router = express.Router();
const chatListService = require('../services/chat.list.service.js');

router.get('/chatlist', getChatList);
router.get('/chatlist/:id', getSearchedChatList);

function getChatList(req, res) {
  chatListService.getChatList(req).then((response) => {
    if (response || response === 0) {
      res.json(response);
    } else {
      res.sendStatus(404);
    }
  });
}

function getSearchedChatList(req, res) {
  chatListService.getSearchedChatList(req).then((response) => {
    if (response || response === 0) {
      res.json(response);
    } else {
      res.sendStatus(404);
    }
  });
}

module.exports = router;