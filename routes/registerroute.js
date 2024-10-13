const express= require('express');
const bcrypt=   require('bcrypt');
const router = express.Router();
const saltRounds=process.env.SALT_ROUNDS;
const User= require('../db/userModel');


router.post('/register',async (req,res)=>{
    const {name,email,password}= req.body;
    try{
        const user= await User.findOne({email:email});
        if(user){
            res.render('auth/register',{error:"You already have an account. Please login."});
            return
        }
        const hashedPassword= await bcrypt.hash(password,parseInt(saltRounds));
        const newUser= new User({name,email,password:hashedPassword,urls:[]});
        await newUser.save();
        console.log('success');
        req.session.message="Account created successfully. Please login.";
        res.redirect('/');
    }catch(err){
        console.log(err);
        res.redirect('/error');
        return
    }
})

module.exports= router;