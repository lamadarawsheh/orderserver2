require('./db/mongoose') //so that this runs
const express = require('express')
const Book = require('./models/book.js')
const request = require('request') 
const bookRouter = require('./routes/book')

const app = express()
const port = process.env.PORT || 3003

app.use(express.json()) //to parse incoming json to object.
app.use(bookRouter)


app.listen(port, ()=>{
    console.log('server is listening')
})