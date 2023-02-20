const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth");

route.post("/registration", authController.registration);
route.post("/login", authController.login);

module.exports =  route;
