const express = require('express')
const { addProduct, productlist, productDetails, updateProduct, deleteProduct, filterProduct, findRelated } = require('../controller/productController')
const { requireSignin } = require('../controller/userController')
const upload = require('../middleware/upload')
const { productCheck, validation } = require('../validation')
const router = express.Router()

router.post('/addproduct',upload.single('product_image'),productCheck, validation,requireSignin,addProduct)
router.get('/productlist',productlist)
router.get('/product/details/:product_id',productDetails)
router.put('/product/update/:product_id',upload.single('product_image'),requireSignin,updateProduct)
router.delete('/product/delete/:product_id',requireSignin, deleteProduct)
router.post('/filterproduct',filterProduct)
router.get('/getrelatedproducts/:id',findRelated)



module.exports = router