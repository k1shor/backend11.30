const express = require('express')
require('dotenv').config()

const db = require('./database/connection')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')



const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/productRoute')
const UserRoute = require('./routes/userRoute')

const port = process.env.PORT || 8000

const app = express()


//middleware
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser())


//routes
app.use('/api',CategoryRoute)
app.use('/api',ProductRoute)
app.use('/api',UserRoute)


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