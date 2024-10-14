const express= require('express');
const bcrypt=   require('bcrypt');
const router = express.Router();
const saltRounds=process.env.SALT_ROUNDS;
const User= require('../db/userModel');


router.post('/',async (req,res)=>{
    const {email,password}= req.body;
    try{
        const user= await User.findOne({email:email});
        if(!user){
            res.render('auth/login',{error:"You don't have an account. Please register first."});
            return
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.render('auth/login',{error:"Invalid email or password"});
            return
        }
        req.session.user={uid:user._id,name:user.name,email:user.email};
        res.redirect('/home');


    }catch(err){
        console.log(err);
        res.redirect('/error');
        return
    }   

})

module.exports= router;