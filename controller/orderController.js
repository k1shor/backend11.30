const Order = require("../model/orderModel")
const OrderItems= require("../model/orderItemsModel")

exports.placeOrder = async(req,res)=>{
    let orderItemsId = await Promise.all(
        req.body.orderItems.map(async(order)=>{
            let newOrder = new OrderItems({
                product:order.product,
                quantity: order.quantity
            })
            newOrder = await newOrder.save()
            return newOrder._id
        })
    )

// orderItem
// samsung mobile -10
// acer laptop -3
// sony headphone -12

// order
// orderItems - [sm, al, sh]
// individualtotalPrice - [300000, 300000, 12000]

    // calculate individual total price first
    let individualTotalPrice = await Promise.all(
        orderItemsId.map(async(order)=>{
            let orderItem = await OrderItems.findById(order).populate('product','product_price')
            const totalindividualprice = orderItem.quantity*orderItem.product.product_price
            return totalindividualprice
        })
    )
    //calculate total price
    let totalPrice = individualTotalPrice.reduce((acc, curr)=>acc+curr)

    let order = new Order({
        orderItems: orderItemsId,
        user: req.body.user,
        total_price :totalPrice,
        shipping_address: req.body.shipping_address,
        shipping_address2: req.body.shipping_address2,
        phone: req.body.phone,
    })

    order = await order.save()
    if(!order){
        res.status(400).json({error: "failed to place order"})
    }
    else{
        // res.status(200).json({message: "your order has been placed"})
        res.send(order)
    }

}


// to view all orders
exports.orders = async (req,res) => {
    let orders = await Order.find()
    // .populate('user','user_name')
    if(!orders){
        return res.status(400).json({error: "something went wrong"})
    }
    else{
        res.send(orders)
    }
}

// to view order details
exports.orderDetails = async(req,res) =>{
    let order = await Order.findById(req.params.orderId).populate('user','user_name')
    .populate({path:'orderItems',populate:({path:'product',populate:('category')})})
    if(!order){
        return res.status(400).json({error: "something went wrong"})
    }
    else{
        res.send(order)
    }
}

// to view orders of a user
exports.userOrder = async(req,res) => {
    let order = await Order.find({
        user: req.params.userId
    })
    .populate({path:'orderItems',populate:({path:'product',populate:('category')})})
    .select("-user")
    if(!order){
        return res.status(400).json({error: "something went wrong"})
    }
    else{
        res.send(order)
    }
}

// to update order status
exports.updateOrder = async(req,res) =>{
    let order = await Order.findByIdAndUpdate(req.params.id,
        {
            status: req.body.status
        },
        {new:true})
    if(!order){
        return res.status(400).json({error: "something went wrong"})
    }
    else{
        res.send(order)
    }
}

// to delete order
exports.deleteOrder =async (req,res) =>{
    let order = await Order.findById(req.params.id)
    .then(async(order)=>{
        if(!order){
            res.status(400).json({error:"Order not found"})
        }
        else{
            await order.orderItems.map(async(item)=>{
                let orderItem = await OrderItems.findByIdAndRemove(item)
                if(!orderItem){
                    return res.status(400).json({error:"Failed to remove item"})
                }
            })
            Order.findByIdAndRemove(req.params.id)
            .then(()=>{
                res.status(200).json({message:"Order deleted successfully"})
            })
        }
    })
    .catch(err=>res.status(400).json({error:err}))
}