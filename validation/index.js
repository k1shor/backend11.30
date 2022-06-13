const {check, validationResult} = require('express-validator')

exports.validation = (req,res,next) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg})
        // return res.status(400).json({errors:errors.array().map(err=>err.msg)})
    }
    next()
}

exports.categoryCheck = [
    check('category_name','category name is required').notEmpty()
    .isLength({min:3}).withMessage('category must be at least 3 characters')
]

exports.productCheck =[
    check('product_name','product_name is required').notEmpty(),
    check('product_price','price is required').notEmpty()
    .isNumeric().withMessage('price must be a number'),
    check('product_description','description is required').notEmpty()
    .isLength({min:20}).withMessage('description must be at least 20 characters'),
    check('category','category is required').notEmpty(),
    check('count_in_stock','count in stock is required').notEmpty()
    .isNumeric('count must be a number')
]

exports.userCheck = [
    check('user_name',"name is required").notEmpty()
    .isLength({min:3}).withMessage("name must be at least 3 characters"),
    check('email',"email is required").notEmpty()
    .isEmail().withMessage("incorrect email format"),
    check('password',"password is required").notEmpty()
    .matches(/[a-z]/).withMessage('password must contain at least 1 lowercase character')
    .matches(/[A-Z]/).withMessage('password must contain at least 1 uppercase character')
    .matches(/[0-9]/).withMessage('password must contain at least 1 number')
    .matches(/[\-_!@#$%^&*]/).withMessage('password must contain at least 1 special character')
    .isLength({min:8}).withMessage('password must be at least 8 characters')
    .isLength({max:30}).withMessage('password must not be more than 30 characters')
]