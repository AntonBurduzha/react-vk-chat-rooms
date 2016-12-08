const express = require('express');
const router = express.Router();
const userService = require('../services/user.service.js');

router.post('/', createUser);
router.post('/create_chat', createChat);
router.post('/remove_chat', removeChat);
router.get('/:id', getUserInfo);

function removeChat(req, res) {
  const result = userService.removeChat(req);
  if (result || result === 0) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
}

function createUser(req, res) {
  const result = userService.postUserData(req);
  if (result || result === 0) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
}

function createChat(req, res) {
  const result = userService.postNewChatData(req);
  if (result || result === 0) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
}

function getUserInfo(req, res) {
  userService.getUserData(req).then((response) => {
     if (response || response === 0) {
       res.json(response);
     } else {
       res.sendStatus(404);
     }
  });
}

module.exports = router;

