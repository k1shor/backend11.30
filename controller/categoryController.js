// exports.showInfo=(req,res)=>res.send("this msg is from controller.")

const Category = require('../model/categoryModel')


// to add category
exports.addCategory = async (req,res) => {
    let category = new Category(req.body)

    Category.findOne({category_name:category.category_name}, async(error, data)=>{
        if(data==null){
            category = await category.save()
            if(!category){
                return res.status(400).json({error:"something went wrong"})
            }
            else{
                res.send(category)
            }
        }
        else{
            return res.status(400).json({error:"category already exists."})
        }
    })    
}

// to get all categories
exports.getCategories = async (req,res) => {
    let categories = await Category.find()
    if(!categories){
        return res.status(400).json({error:"something went wrong"})
    }
    else{
        res.send(categories)
    }
}

// to get a particular category
exports.findCategory = async (req, res) =>{
    let category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    else{
        res.send(category)
    }
}

// to update a category
exports.updateCategory = async (req,res) =>{
    let category = await Category.findByIdAndUpdate(req.params.c_id,
        {
            category_name:req.body.category_name
        },
        {
            new:true
        })
        if(!category){
            return res.status(400).json({error:"something went wrong"})
        }
        else{
            res.send(category)
        }
}

//to delete a category
exports.deleteCategory = (req,res) =>{
    Category.findByIdAndRemove(req.params.id)
    .then(category=>{
        if(!category){
            return res.status(400).json({error:"category does not exist."})
        }
        else{
            return res.status(200).json({message:"category deleted successfully"})
        }
    })
    .catch(error=>{return res.status(400).json({error:error})})
}
