const express = require('express')
const { addProduct, productlist, productDetails, updateProduct, deleteProduct } = require('../controller/productController')
const upload = require('../middleware/upload')
const { productCheck, validation } = require('../validation')
const router = express.Router()

router.post('/addproduct',upload.single('product_image'),productCheck, validation,addProduct)
router.get('/productlist',productlist)
router.get('/product/details/:product_id',productDetails)
router.put('/product/update/:product_id',updateProduct)
router.delete('/product/delete/:product_id',deleteProduct)



module.exports = router