const mongoose = require('mongoose');

require('../models/User');
const User = mongoose.model('User');

function getUserByEmail (email, callback) {
  User.findOne({ email }, (err, user) => {
    if (err) return callback(err, null);
    return callback(null, user);
  });
}


function getUserById (id, callback) {
  User.findById(id, (err, user) => {
    if (err) return callback(err, null);
    return callback(null, user);
  });
}

function getUserByUsername (username, callback) {
  User.findOne({ username }, (err, user) => {
    if (err) return callback(err, null);
    return callback(null, user);
  });
}

function createUser (payload, callback) {
  let user = new User();
  
  user.email = payload.user.email;
  user.username = payload.user.username;
  user.setPassword(payload.user.password);

  user.save((err, user) => {
    if (err) return callback(err, null);
    return callback(null, user);
  });
}

function updateUser (user, payload, callback) {
  if (user.username !== payload.user.username) {
    user.username = payload.user.username;
  }

  if (user.email !== payload.user.email) {
    user.email = payload.user.email;
  }

  user.bio = payload.user.bio;
  user.image = payload.user.image;

  if (payload.user.password !== '') {
    user.setPassword(payload.user.password);
  }

  user.save((err, user) => {
    if (err) return callback(err, null);
    return callback(null, user);
  });
}



module.exports = [
  {
    name: 'services.users.getByEmail',
    method: getUserByEmail
  },
  {
    name: 'services.users.getById',
    method: getUserById
  },
  {
    name: 'services.users.getByUsername',
    method: getUserByUsername
  },
  {
    name: 'services.users.create',
    method: createUser
  },
  {
    name: 'services.users.update',
    method: updateUser
  }
];
 