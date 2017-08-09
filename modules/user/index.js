const express = require('express');
const bodyParser = require('body-parser');
const user = express();
const UserService = require('./services/User');

user.use(function(req, res, next) {
    if (req.method === 'GET') {
        next();
    } else {
        try {
            let user = UserService.find(+req.query.user_id)
            if(!user.admin) {
                throw new Error('Your are not permitted for this action');
            } else {
                next();
            }
        } catch (e) {
            res.sendStatus(403);
        }
    }
});
user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: true }));

user.get('/', function (req, res) {
    res.json({
        status: 1,
        data: UserService.findAll()
    });
});

user.post('/', function (req, res) {
    try {
        res.json({
            status: 1,
            data: UserService.create(req.body)
        });
    } catch (e) {
        res.json({
            status: 0,
            error: e.message
        });
    }
});

user.get('/:id', function (req, res) {
    try {
        res.json({
            status: 1,
            data: UserService.find(+req.params.id)
        });
    } catch (e) {
        res.json({
            status: 0,
            error: e.message
        });
    }
});

user.put('/:id', function (req, res) {
    try {
        res.json({
            status: 1,
            data: UserService.update(+req.params.id, req.body)
        });
    } catch (e) {
        res.json({
            status: 0,
            error: e.message
        });
    }
});

user['delete']('/:id', function (req, res) {
    try {
        res.json({
            status: 1,
            data: UserService.remove(+req.params.id)
        });
    } catch (e) {
        res.json({
            status: 0,
            error: e.message
        });
    }
});

module.exports = user;