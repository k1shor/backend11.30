const express = require('express')
const { addUser, signin, signout, confirmUser, resendConfirmation, forgetPassword, resetPassword, updateUser, userList, userDetails, removeUser } = require('../controller/userController')
const { userCheck, validation } = require('../validation')
const router = express.Router()



router.post('/register',userCheck, validation, addUser)
router.post('/signin',signin)
router.get('/signout',signout)
router.get('/verification/:token',confirmUser)
router.post('/resendVerification',resendConfirmation)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword/:token',resetPassword)
router.put('/update/user/:id',updateUser)
router.get('/userlist',userList)
router.get('/user/details/:id', userDetails)
router.delete('/user/delete/:id',removeUser)

module.exports = router