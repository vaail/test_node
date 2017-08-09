const express = require('express');
const app = express();
const user = require('./modules/user');

app.get('/', function (req, res) {
    res.send('Test app');
});

app.use(['/user'], user);

app.listen(3000, function () {
    console.log('Test app listening on port 3000!');
});