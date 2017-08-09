const UserModel = require('../models/User');

module.exports = [
    new UserModel('admin', 'admin','admin', true),
    new UserModel('user', 'user','user', false)
];