const Users = require('../users/users-model');

const checkPayload = (req, res, next) => {
  // needs req.body to include username, password
  if (!req.body.username || !req.body.password) {
    res.status(401).json('bad payload')
  } else {
    next()
  }
}

const checkUsernameUnique = async (req, res, next) => {
  // username must not be in the db already
  try {
    const rows = await Users.findBy({ username: req.body.username })
    if (!rows.length) {
      next()
    } else {
      res.status(401).json('username taken')
    }
  } catch (err) {
    res.status(500).json('something failed tragically')
  }
}

const checkUsernameExists = async (req, res, next) => {
  // username must be in the db already
  // we should also tack the user in db to the req object for convenience
  try {
    const rows = await Users.findBy({ username: req.body.username })
    if (rows.length) {
      req.userData = rows[0]
      next()
    } else {
      res.status(401).json('who is that exactly?')
    }
  } catch (err) {
    res.status(500).json('something failed tragically')
  }
}

const restricted = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    res.status(401).json('unauthorized')
  }
}

module.exports = {
  checkPayload,
  checkUsernameUnique,
  checkUsernameExists,
  restricted
}