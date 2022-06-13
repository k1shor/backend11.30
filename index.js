const express = require('express')
require('dotenv').config()

const db = require('./database/connection')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRoute')
const UserRoute = require('./routes/userRoute')
const OrderRoute = require("./routes/orderRoute")

const port = process.env.PORT || 8000

const app = express()

//middleware
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/public/uploads',express.static('./public/uploads'))
app.use(cors())

//routes
app.use('/api',CategoryRoute)
app.use('/api',ProductRoute)
app.use('/api',UserRoute)
app.use('/api',OrderRoute)


// to run server
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})

// app.get('/',(request,response)=>
//     response.send('This is the index page.')
// )

// app.get('/hello',(request,response)=>
//     response.send('Hello! This is Express js.' )
// )

// app.get('/hellothere',(request,response)=>
// response.send('Hello! This is Express js.' )
// )