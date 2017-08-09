'use strict';
const _ = require('lodash');
const validate = require("validate.js");
validate.validators.boolean = function(value, options, key, attributes) {
    if(options && !validate.isBoolean(value)) {
        return "must be boolean";
    }
};
let _id = 0;

function UserModel(username, firstname, lastname, admin) {
    _.assign(this, {id: ++_id}, {
        username,
        firstname,
        lastname,
        admin
    })
}

UserModel.prototype.defaults = {
    "username": "",
    "firstname": "",
    "lastname": "",
    "admin": false
};

UserModel.prototype.validateRules = {
    "username": {
        "presence": true,
        "length": {
            "minimum": 3,
            "maximum": 10
        }
    },
    "firstname": {
        "presence": true,
        "length": {
            "minimum": 3,
            "maximum": 10
        }
    },
    "lastname": {
        "presence": true,
        "length": {
            "minimum": 3,
            "maximum": 10
        }
    },
    "admin": {
        "presence": true,
        "boolean": true
    },
};

UserModel.prototype.validate = function () {
  return validate(this, this.validateRules);
};

UserModel.prototype.setUsername = function (username) {
    this.username = username;
};

UserModel.prototype.setFirstname = function (firstname) {
    this.firstname = firstname;
};

UserModel.prototype.setLastname = function (lastname) {
    this.lastname = lastname;
};

UserModel.prototype.setAdmin = function (admin) {
    this.admin = !!admin;
};

module.exports = UserModel;