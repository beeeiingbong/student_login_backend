const express=require('express')
const app= express()
const mongoose= require('mongoose')
const bodyParser= require('body-parser')
const cors=require('cors')

const { MONGODB } = require('./config')
const userRoutes = require('./routes/user')
const noteRoutes = require('./routes/details')
const auth = require('./middleware/auth');

//CHECK the server
app.get('/', (req, res, next)=> res.send("Welcome"))

//other Middlewares
app.use(bodyParser.json())
app.use(cors())

//Routes Middlewares
app.use('/api/details',auth, noteRoutes)
app.use('/api/users',userRoutes)

//Error Handling
app.use((req,res,next)=> {
    const err= new Error('Not Found')
    err.status = 404
    next(err);
})
app.use((err, req,res, next) => {
    const status = err.status || 500
    res.status(status).json({error: {message: err.message}})
})

//Connecting to Mongodb
mongoose.connect(MONGODB, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
        .then(()=> {
            console.log('Connected to MONGODB')
            return app.listen(9000,()=> console.log("Server is running at port 9000"))
        })
        .catch(err=> console.log(err.message))
