const express= require('express');

const router = express.Router();

const User= require('../db/userModel');
const Url = require('../db/urlModel');


router.get('/home',async (req,res)=>{
    if(!req.session.user){
        req.session.message = 'You need to log in first';
        res.redirect('/')
        return
    }
    const user= await User.findById(req.session.user.uid);
    const urlArray= user.urls;
    try {
        const urls = await Url.find({ uid: { $in: urlArray } });
        res.render('home/newdash', { urls });
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
    

})

module.exports= router;