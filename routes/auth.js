const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth");

route.post("/registration", authController.registration);

module.exports =  route;
