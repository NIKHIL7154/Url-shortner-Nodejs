const express= require('express');
const Url= require('../db/urlModel');
const router = express.Router();
const saltRounds=process.env.SALT_ROUNDS;
const User= require('../db/userModel');


router.post('/',async (req,res)=>{
    const {dest,uid}=req.body;
    
    try{
        const ifUrlExists= await Url.exists({uid:uid});
        if(ifUrlExists){
            req.session.homeMessage="This id is already taken by someone else.";
            res.redirect('/home');
            return
        }
        
        const user= await User.findById(req.session.user.uid);
        const newUrl= new Url({dest,uid});
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