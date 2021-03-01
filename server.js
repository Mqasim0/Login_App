const express = require('express');
const path = require('path')
const app = express()
const bodyParser = require('body-parser') // is responsible for passing the incoming request bodies in the middleware before you use it
const session = require('express-session')
const { v4: uuidv4 } = require('uuid');

const router = require('./router')

const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  secret:uuidv4(),
  resave:false,
  saveUninitialized:true
}))

app.set('view engine', 'ejs')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
  res.render('base', {title:'Login System'})
})

app.use('/router', router)

app.listen(PORT,(req,res)=>{
  console.log(`server Running on port ${PORT}`)
})