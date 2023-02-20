const router = require('express').Router()
const userController = require('../controllers/user')
const jwtAuthenticator = require('../middlewares/jwtAuthenticator')

router.get("/user", jwtAuthenticator.verifyJWTToken ,userController.getUser)

module.exports = router