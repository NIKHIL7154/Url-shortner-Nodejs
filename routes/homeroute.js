const express= require('express');

const router = express.Router();

const User= require('../db/userModel');
const Url = require('../db/urlModel');
const verifySession = require('../middle/session');

//router.use(verifySession)
router.get('/',async (req,res)=>{
    if(!req.session.user){
        req.session.message = 'You need to log in first';
        res.redirect('/')
        return
    }
    const user= await User.findById(req.session.user.uid);
    const urlArray= user.urls;
    try {
        const urls = await Url.find({ uid: { $in: urlArray } });
        const message= req.session.homeMessage;
        req.session.homeMessage = null
        res.render('home/newdash', { urls ,homeMessage:message});
        
        return
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
    

})

module.exports= router;