//  order - [orderItems], totalprice, user, shipping_address, phone, status


// orderItem
// samsung mobile -10
// acer laptop -3
// sony headphone -12

// order
// orderItems - [sm, al, sh]

const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const orderSchema = mongoose.Schema({
    orderItems:[{
        type:ObjectId,
        ref:"OrderItems",
        required:true
    }],
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    total_price:{
        type:Number,
        required: true
    },
    shipping_address:{
        type: String,
        required: true
    },
    shipping_address2:{
        type:String
    },
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    }
}, {timestamps:true})

module.exports = mongoose.model('Order', orderSchema)