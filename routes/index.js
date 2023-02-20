const authRoutes = require('./auth')
const productRoutes = require('./product')
const userRoutes = require('./user')
const app = require('express')();

app.use("/", authRoutes);
app.use("/", productRoutes)
app.use("/", userRoutes)

module.exports = app