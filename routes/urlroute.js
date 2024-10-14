const express= require('express');

const router = express.Router();

const User= require('../db/userModel');
const Url = require('../db/mark');

router.get("/:urlid",async (req,res)=>{
    const urlid= req.params.urlid;
    try {
        const url = await Url.findOne({uid:urlid});
        if(!url){
            res.redirect('/error');
            return
        }
        res.redirect(url.dest);

        return
    }
    catch (error) {
        console.error(error);
        res.redirect('/error');
    }       
})

module.exports= router;

