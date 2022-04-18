const express = require('express')
const { addCategory, getCategories, findCategory } = require('../controller/categoryController')
const router = express.Router()


router.post('/postcategory',addCategory)
router.get('/categories',getCategories)
router.get('/findcategory/:id',findCategory)




module.exports = router