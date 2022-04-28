const express = require('express')
const { addCategory, getCategories, findCategory, updateCategory, deleteCategory } = require('../controller/categoryController')
const { categoryCheck, validation } = require('../validation')
const router = express.Router()


router.post('/postcategory',categoryCheck,validation,addCategory)
router.get('/categories',getCategories)
router.get('/findcategory/:id',findCategory)
router.put('/updatecategory/:c_id',categoryCheck, validation,updateCategory)
router.delete('/deletecategory/:id',deleteCategory)




module.exports = router