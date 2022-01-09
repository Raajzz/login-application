const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require("passport");

const initializedPassport = require("./passport-config");
initializedPassport(passport);

app.set('view-engine','ejs')

app.use(express.urlencoded({extended:true}))

/******************************
  DO NOT USE IN PRODUCTION CODE | 
  Also, the as the server restarts the users variable will be 
  reinitialized. 
*******************************/ 
const users = []

app.get('/',(req,res)=>{
  res.render('index.ejs',{name:'fritz'});
})

app.get('/register',(req,res)=>{
  res.render('register.ejs');
})

app.get('/login',(req,res)=>{
  res.render('login.ejs');
})

app.post('/login',(req,res)=>{

})

app.post('/register',async (req,res)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id:Date.now().toString(),
      name:req.body.name,
      email:req.body.email,
      password:hashedPassword
    })
    res.redirect('/login')
  } catch{
    res.redirect('register.ejs')
  } 
  console.log(users);
})

app.listen(3000) 