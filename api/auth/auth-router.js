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

router.post('/login', checkPayload, checkUsernameExists,(req, res) => {
  try {
    // compare raw password to hash saved password
    const verify = bycrypt.compareSync(req.body.password, req.userData.password)
    if(verify) {
      // set-cookie header is set on res
      // active session for user is saved
      req.session.user = req.userData
      res.json(`Great to see you again ${req.userData.username}`)
    } else {
      res.status(401).json('No! Try again. Better this time!')
    }
  } catch (error) {
    res.status(500).json('Sleep little server. Sleep.')
  }
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json('You can checkout anytime you like, but you can never leave')
      } else {
        res.json('go then. get out')
      }
    })
  } else { 
    res.json('buggy code. you were not here to begin with')
  }
})

module.exports = router;