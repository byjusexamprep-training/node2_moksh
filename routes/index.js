const authRoutes = require('./auth')
const productRoutes = require('./product')
const app = require('express')();

app.use("/", authRoutes);
app.use("/", productRoutes)

module.exports = app