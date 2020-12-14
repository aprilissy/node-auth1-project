const router = require('express').Router();
const bycrypt = require('bcryptjs');
const Users = require('../users/users-model');

const {checkPayload, checkUsernameUnique, checkUsernameExists} = require('../middleware/middleware');

router.post('/register', (req, res) => {

})

router.post('/login', (req, res) => {

})

router.get('/logout', (req, res) => {

})

module.exports = router;