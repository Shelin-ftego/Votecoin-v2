const express = require('express')
require('../backend/database/mongoose')
require('dotenv').config();

//express framework applciation 
const app = express()

//routers
const voter_router = require('./routers/voter_router')
const admin_router = require('./routers/admin_router')
const home_router = require('./routers/home_router')

app.use(home_router)
app.use(voter_router)
app.use(admin_router)
app.use(express.json())

const port = process.env.PORT
app.listen(port, ()=>{
    console.log('Server is listening on port ', port,'...')
})