const express= require('express');
const session= require('express-session');
require('dotenv').config()
const loginRoute= require('./routes/loginroute.js');
const registerRoute= require('./routes/registerroute.js');
const homeRoute = require("./routes/homeroute.js")
const createUrlRoute = require("./routes/createurlroute.js")
const visitUrlRoute =require("./routes/urlroute.js");
const slugRoutes=require("./routes/slugroute.js")
const verifySession = require('./middle/session.js');


const app = express();
const store= new session.MemoryStore;

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','pug');

//session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60 }, //max age of cookie is 1 hour
    store: store,
}))


//functionality routes
app.use('/',registerRoute); //register route
app.use("/",homeRoute); //home route
app.use("/",createUrlRoute); //create url route
app.use("/c",visitUrlRoute); //visit url route
app.use("/slug",verifySession,slugRoutes); //slug route
app.use('/',loginRoute); //login route


//dafault routes
app.get("/",(req,res)=>{
    
    res.render('auth/login',{error:req.session.message});
})
app.get("/register",(req,res)=>{
    res.render('auth/register')
})
app.get("/error",(req,res)=>{
    res.render('404')
    return
})

app.get("/dems",(req,res)=>{
    res.render("home/newdash",{urls:[{url:"https://www.google.com",shortUrl:"http://localhost:2001/c/1234",uid:4545}]})
})

//logout route
app.post("/logout",(req,res)=>{
    store.destroy(req.sessionID,(err)=>{
        if(err){
            console.error(err);
            res.redirect('/error');
            return
        }
        req.session.destroy();
        res.redirect('/')
    })
    
})


//start server
app.listen(2001,()=>{
    console.log('Server started at port 2001');
})