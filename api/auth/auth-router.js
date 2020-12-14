const router = require('express').Router();
const bycrypt = require('bcryptjs');
const Users = require('../users/users-model');

const {checkPayload, checkUsernameUnique, checkUsernameExists} = require('../middleware/middleware');

router.post('/register', checkPayload,checkUsernameUnique,async (req, res) => {
  try {
    // hash the password
    const hash = bycrypt.hashSync(req.body.password, 10) // 2^10
    // create new user's record in db
    const newUser = await Users.add({ 
      username: req.body.username,
      password: hash
    })
    // send back to user
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message:error.message })
  }
})

router.post('/login', (req, res) => {

})

router.get('/logout', (req, res) => {

})

module.exports = router;