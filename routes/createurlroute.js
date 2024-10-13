const express= require('express');
const Url= require('../db/urlModel');
const router = express.Router();
const saltRounds=process.env.SALT_ROUNDS;
const User= require('../db/userModel');


router.post('/create',async (req,res)=>{
    const {dest,uid}=req.body;
    if(!req.session.user){
        req.session.message = 'You need to log in first';
        res.redirect('/')
        return
    }
    try{
        const user= await User.findById(req.session.user.uid);
        const newUrl= new Url({dest,uid,shortUrl:"http://localhost:2001/c/"+uid});
        await newUrl.save();
        user.urls.push(uid);
        await user.save();
        res.redirect('/home');
    }catch(err){
        console.log(err);
        res.redirect('/error');
        return
    }


})

module.exports= router;