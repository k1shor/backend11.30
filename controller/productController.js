const Product = require('../model/productModel')

exports.addProduct = async(req,res)=>{
    let product = new Product({
        product_name:req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        product_image:req.body.product_image,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category
    })
    product = await product.save()

    if(!product){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(product)
}

// to view product list
exports.productlist = async(req,res)=>{
    let product = await Product.find().populate('category')
    if(!product){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(product)

}

// to view product details
exports.productDetails = async(req,res)=>{
    let product = await Product.findById(req.params.product_id).populate('category')
    if(!product){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(product)
}

// to update a product
exports.updateProduct = async(req,res)=>{
    let product = await Product.findByIdAndUpdate(req.params.product_id,
        {
            product_name:req.body.product_name,
            product_price: req.body.product_price,
            product_description: req.body.product_description,
            product_image:req.body.product_image,
            count_in_stock: req.body.count_in_stock,
            category: req.body.category
        },
        {new:true})
        if(!product){
            return res.status(400).json({error:"something went wrong"})
        }
        res.send(product)
}

// to delete/remove a product
exports.deleteProduct = (req,res) =>{
    Product.findByIdAndRemove(req.params.product_id).then(product=>{
        if(!product){
            return res.status(400).json({error:"product doesnot exist."})
        }
        else{
            return res.status(200).json({
                message:"product deleted successfully"
            })
        }
    })
    .catch(err=>res.status(400).json({error:err}))
}