const express = require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// registration
userRouter.post("/register", async(req,res)=>{
    const {email,pass,location,age}=req.body
   try{
    bcrypt.hash(pass, 5, async(err, hash) =>{
     const user=new UserModel({email,pass:hash,location,age})
     await user.save()
    res.status(200).send({"msg": "Registration has been done!"})

    });
   }catch(err){
    res.status(400).send({"msg": err.message})
   }
})

// login
userRouter.post("/login", async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.findOne({email})
        console.log(user);
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"Login succesfully", "token":jwt.sign({"userID":user._id},"masai")})
                }
                else{
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            });
        }
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// userRouter.get("/details",(req,res)=>{
//     const token=req.headers.authorization
//     jwt.verify(token, 'prince', (err, decoded) =>{
//        decoded? res.status(200).send("User Details"):res.status(400).send({"msg":err.message})
//       });
    
// })

// userRouter.get("/moviedata",(req,res)=>{
//     const {token}=req.query
//     jwt.verify(token, 'prince', (err, decoded) =>{
//         decoded? res.status(200).send("Movie"):res.status(400).send({"msg":"Login required, cannot access"})
//        });
// })

module.exports={
    userRouter
}