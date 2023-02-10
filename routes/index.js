const authRoutes = require('./auth')
const app = require('express')();

app.use("/", authRoutes);

module.exports = app