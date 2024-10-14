const express= require('express');
const router = express.Router();
const User= require('../db/userModel');
const Url = require('../db/mark');
const verifySession = require('../middle/session');




router.post('/update',async (req,res)=>{
    const {uid,newuid,dest}=req.body;
    try{
        const newUrl = await Url.findOne({uid:uid});
        if(!newUrl){
            res.redirect('/error');
            return
        }
        newUrl.uid=newuid;
        newUrl.dest=dest;
        newUrl.shortUrl=`http://localhost:2001/c/${newuid}`;
        await newUrl.save();
        const user=await User.findById(req.session.user.uid);
        if(!user){
            console.log('user not found');
            res.redirect('/error');
            return
        }
        user.urls=user.urls.filter(url=>url.uid!==uid);
        user.urls.push(newuid)
        await user.save();
        res.redirect('/home');
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
})

router.post('/delete',async (req,res)=>{
    const {uid}=req.body;
    try{
        await Url.deleteOne({uid:uid});
        await User.findByIdAndUpdate(
            req.session.user.uid,
            { $pull: { urls: uid } }
        );
        res.redirect('/home');
    }catch(err){
        console.error(err);
        res.redirect('/error');
    }
})

module.exports= router;
