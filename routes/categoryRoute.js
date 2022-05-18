const express = require('express')
const { addCategory, getCategories, findCategory, updateCategory, deleteCategory } = require('../controller/categoryController')
const { requireSignin } = require('../controller/userController')
const { categoryCheck, validation } = require('../validation')
const router = express.Router()


router.post('/postcategory',requireSignin,categoryCheck,validation,addCategory)
router.get('/categories',getCategories)
router.get('/findcategory/:id',findCategory)
router.put('/updatecategory/:c_id',requireSignin,categoryCheck, validation,updateCategory)
router.delete('/deletecategory/:id',requireSignin,deleteCategory)




module.exports = router