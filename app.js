const express = require('express');
const app = express();
const path = require('path');
const authRoutes = require(path.join(__dirname, 'routes', 'auth'));

app.use('/', authRoutes);

app.listen(3000, function() {
    console.log('Listening on 3000!');
});

module.exports = {
    app
};