const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const Token = require('../model/tokenModel')
const crypto = require('crypto')
const { sendEmail } = require('../middleware/sendEmail')


exports.addUser = async (req, res) => {
    User.findOne({ email: req.body.email }, async (error, data) => {
        if (data == null) {
            let user = new User({
                user_name: req.body.user_name,
                email: req.body.email,
                password: req.body.password,
            })
            user = await user.save()
            if (!user) {
                return res.status(400).json({ error: "something went wrong" })
            }
            // generate token and send in email
            let token = new Token({
                userId : user._id,
                token : crypto.randomBytes(16).toString('hex'),
            })
            token = await token.save()
            if(!token){
                return res.status(400).json({ error: "something went wrong" })
            }
            // send token in mail
            sendEmail({
                from:'noreply@example.com',
                to:user.email,
                subject: 'Verification Email',
                text:`Please click on the link below to verify your account. http://localhost:5000/api/verification/${token.token}`,
                html: `<a href='http://localhost:5000/api/verification/${token.token}'><button>Verify your account</button></a>`
            })


            res.send(user)
        }
        else {
            return res.status(400).json({ error: "email already exists" })
        }
    }
    )
}

// signin process
exports.signin = async (req, res) => {
    // destructing to get email and password
    const { email, password } = req.body
    // to check if email is registered or not
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ error: "Email does not exist. Please register or try again with different email" })
    }
    //if email exists, check if password is correct
    if (!user.authenticate(password)) {
        return res.status(400).json({ error: "Email and Password do not match. Please try again." })
    }
    //if email and password match, check if user is verified or not
    if (!user.isVerified) {
        return res.status(400).json({ error: "User not verified. Please verify to continue." })
    }

    // generate token to signin
    const token = jwt.sign({ _id: user._id, user: user.role }, process.env.JWT_SECRET)


    res.cookie('myCookies',token, {expire:Date.now()+86400})

    const { user_name, _id, role } = user
    return res.json({ token, user: { _id, user_name, role, email } })
}

//signout
exports.signout = (req,res) =>{
    res.clearCookie('myCookies')
    return res.status(200).json({message:"Sign out successful"})
}

// user confirmation
exports.confirmUser = async(req,res) =>{
    let token = await Token.findOne({token:req.params.token})
    if(!token){
        return res.status(400).json({error: "Invalid token"})
    }
    let user = await User.findOne({_id:token.userId})
    if(!user){
        return res.status(400).json({error: "User not found"})
    }
    if(user.isVerified){
        return res.status(400).json({error: "User already verified"})
    }
    user.isVerified = true

    user = user.save(
        error=>{
            if(error){
        return res.status(400).json({error: error})

            }
        return res.status(200).json({error: "User verified successfully"})

        }
    )

}

// resend confirmation
exports.resendConfirmation = async(req,res) => {
    let user = await User.findOne({email:req.body.email})
    // check if user exists
    if(!user){
        return res.status(400).json({error:"user not registered. Please try different email or register"})
    }
    // check if user is already verified
    if(user.isVerified){
        return res.status(400).json({error: "user already verified. login to continue"})
    }
    let token = new Token({
        token : crypto.randomBytes(16).toString('hex'),
        userId : user._id
    })
    token = await token.save()
    if(!token){
        return res.status(400).json({error: "something went wrong"})
    }
    else{
        sendEmail({
            from:'noreply@example.com',
            to:user.email,
            subject: 'Verification Email',
            text:`Please click on the link below to verify your account. http://localhost:5000/api/verification/${token.token}`,
            html: `<a href='http://localhost:5000/api/verification/${token.token}'><button>Verify your account</button></a>`
        })
        return res.status(200).json({message:"verification email has been sent"})
    }
}

// to send forget password link
exports.forgetPassword = async(req,res) => {
    let user = await User.findOne({email:req.body.email})
    // check if user exists
    if(!user){
        return res.status(400).json({error:"user not registered. Please try different email or register"})
    }
    
    let token = new Token({
        token : crypto.randomBytes(16).toString('hex'),
        userId : user._id
    })
    token = await token.save()
    if(!token){
        return res.status(400).json({error: "something went wrong"})
    }
    else{
        sendEmail({
            from:'noreply@example.com',
            to:user.email,
            subject: 'Password Reset Link',
            text:`Please click on the link below to reset your password. http://localhost:5000/api/resetpassword/${token.token}`,
            html: `<a href='http://localhost:5000/api/resetpassword/${token.token}'><button>Reset Password</button></a>`
        })
        return res.status(200).json({message:"Password reset link has been sent to your email."})
    }
}

// reset password
exports.resetPassword = async(req,res) =>{
    let token = await Token.findOne({token:req.params.token})
    if(!token){
        return res.status(400).json({error: "Invalid token"})
    }
    let user = await User.findOne({_id:token.userId})
    if(!user){
        return res.status(400).json({error: "User not found"})
    }
    if(!user.isVerified){
        return res.status(400).json({error: "Please verify your account first"})
    }

    user.password = req.body.password

    user =await user.save(
        error=>{
            if(error){
        return res.status(400).json({error: error})

            }
        return res.status(200).json({error: "Password has been reset successfully"})

        }
    )

}

