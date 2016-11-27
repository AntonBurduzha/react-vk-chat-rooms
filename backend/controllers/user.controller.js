const express = require('express');
const router = express.Router();
const loginService = require('../services/login.service');

router.post('/', createUser);
router.get('/chatlist', getChatList);
router.get('/chatlist/:id', getSearchedChatList);
router.get('/:id', getUserInfo);

function getChatList(req, res) {
  loginService.getChatList(req).then((response) => {
    if (response || response === 0) {
      res.json(response);
    } else {
      res.sendStatus(404);
    }
  });
}

function getSearchedChatList(req, res) {
  loginService.getSearchedChatList(req).then((response) => {
    if (response || response === 0) {
      res.json(response);
    } else {
      res.sendStatus(404);
    }
  });
}

function createUser(req, res) {
  const result = loginService.createUser(req);
  if (result || result === 0) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
}

function getUserInfo(req, res) {
   loginService.getUserData(req).then((response) => {
     if (response || response === 0) {
       res.json(response);
     } else {
       res.sendStatus(404);
     }
  });
}

module.exports = router;

