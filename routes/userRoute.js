const express = require('express')
const { addUser, signin, signout, confirmUser, resendConfirmation, forgetPassword, resetPassword } = require('../controller/userController')
const router = express.Router()



router.post('/register',addUser)
router.post('/signin',signin)
router.get('/signout',signout)
router.get('/verification/:token',confirmUser)
router.post('/resendVerification',resendConfirmation)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword/:token',resetPassword)


module.exports = router