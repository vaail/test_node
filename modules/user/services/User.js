const _ = require('lodash');
let _store = require('../mocks/users');
const UserModel = require('../models/User');

function findAll() {
    return _.clone(_store);
}

function find(id) {
    const index = _.findIndex(_store, {id: id});
    if(index === -1) {
        throw new Error('User not found');
    }

    return _.clone(_store[index]);
}

function create(data) {
    let index, errors;
    let user = new UserModel(data.username, data.firstname, data.lastname, !!data.admin);
    errors = user.validate();

    if(typeof errors === 'undefined') {
        index = _store.push(user);
    } else {
        throw new Error(JSON.stringify(errors));
    }

    return _store[index - 1];
}

function update(id, data) {
    let user, errors;
    const index = _.findIndex(_store, {id: id});
    if(index === -1) {
        throw new Error('User not found');
    } else {
        user = _.clone(_store[index]);
    }

    user.setUsername(data.username);
    user.setFirstname(data.firstname);
    user.setLastname(data.lastname);
    user.setAdmin(data.admin);

    errors = user.validate();

    if(typeof errors === 'undefined') {
        _store[index] = user;
    } else {
        throw new Error(JSON.stringify(errors));
    }

    return _store[index];
}

function remove(id) {
    const index = _.findIndex(_store, {id: id});
    if(index === -1) {
        throw new Error('User not found');
    }

    _store.splice(index, 1);
}

const UserService = {
    findAll,
    find,
    create,
    update,
    remove
};
module.exports = UserService;