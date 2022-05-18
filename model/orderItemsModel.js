// orderItem - product, quantity


const mongoose = require('mongoose')
const { modelName } = require('./categoryModel')
const {ObjectId} = mongoose.Schema

const orderItemsSchema = mongoose.Schema({
    product:{
        type:ObjectId,
        ref:'Product',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model("OrderItems",orderItemsSchema)