const express=require('express')    
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../models/Users');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
//Create a user using POST "/api/auth".Doesnt require authentication.No login required
const JWT_SECRET="Adityaisagoodb$oy";


router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password').isLength({min:5})
],async(req,res)=>{
    //if there are errors,return Bad requests and the errors
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
   }
   //check if user with this email already exists

   try {
    

   let user=await User.findOne({email:req.body.email});
   if(user){
    return res.status(400).json({error:"Sorry a user with this email already exists"})
   }
const salt =await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password,salt);
  user=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass
   })
//    .then(user=>res.json(user))
//    .catch(err=>{console.log(err)
//     res.json({error:'Please enter a unique value for email',message:err.message})})
   
const data={
    user:{
        id:user.id
    }
}

const authToken =jwt.sign(data,JWT_SECRET)


   res.json({authToken})
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured")
   }
})

module.exports=router;