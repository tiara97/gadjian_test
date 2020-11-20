const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

// apply middleware
app.use(cors())
app.use(bodyparser.json())
app.use(express.static('./public'))

// connect database
const database = require('./database')
database.connect(err => {
    if (err) return console.log('error connection: ' + err.stack)
    console.log('connected as id : ' + database.threadId)
})

// create route
const router = require('./routers')
app.get('/', (req, res)=> res.status(200).send('<h1>Welcome to my API</h1>'))
app.use('/api', router)

const PORT = 2000
app.listen(PORT, ()=> console.log(`this server is runnning on PORT ${PORT}`))