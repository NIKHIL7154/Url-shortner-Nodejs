const express= require('express');

const router = express.Router();

const User= require('../db/userModel');
const Url = require('../db/urlModel');
const verifySession = require('../middle/session');

//router.use(verifySession)
router.get('/',async (req,res)=>{
    
    const user= await User.findById(req.session.user.uid);
    const urlArray= user.urls;
    try {
        const urls = await Url.find({ uid: { $in: urlArray } });
        const currentUrl = req.protocol + '://' + req.get('host')+'/c/'
        urls.forEach(url=>{
            url.shortUrl= currentUrl+url.uid
        })
        const message= req.session.homeMessage;
        req.session.homeMessage = null
        res.render('home/dashpage', { urls ,homeMessage:message,sessionCreatedTime:req.session.createdAt});
        return
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
    

})

module.exports= router;