const express=require('express')    
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../models/Users');


//Create a user using POST "/api/auth".Doesnt require authentication

router.post('/',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password').isLength({min:5})
],(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
   }
   User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
   }).then(user=>res.json(user))
   .catch(err=>{console.log(err)
    res.json({error:'Please enter a unique value for email',message:err.message})})
   
   

})

module.exports=router;