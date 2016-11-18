var express = require('express');
var router = express.Router();
var loginService = require('../services/login.service');

router.post('/', createUser);
router.get('/:id', getUserInfo);

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

