const router = require('express').Router();

const Users = require('./users-model');

const {restricted} = require('../middleware/middleware');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => res.send(error))
});

module.exports = router;