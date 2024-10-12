const express= require('express');
require('dotenv').config()
const app = express();

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','pug');


//dafault routes
app.get("/",(req,res)=>{
    res.render('auth/login')
})
app.get("/register",(req,res)=>{
    res.render('auth/register')
})

//start server
app.listen(2001,()=>{
    console.log('Server started at port 2001');
})