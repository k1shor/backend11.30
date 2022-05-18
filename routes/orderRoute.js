const express = require('express')
const { placeOrder, orders, orderDetails, userOrder, updateOrder, deleteOrder } = require('../controller/orderController')
const router = express.Router()

router.post('/placeorder',placeOrder)
router.get('/orders',orders)
router.get('/orderdetails/:orderId', orderDetails)
router.get('/userorder/:userId', userOrder)
router.post('/updateorder/:id',updateOrder)
router.delete('/deleteorder/:id',deleteOrder)

module.exports = router