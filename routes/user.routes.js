const express=require("express");
const UserRouter=express.Router();
const {UserModel}=require("../model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

UserRouter.post("/register",async(req,res)=>{
    const{Username, Avatar, Email, Password}=req.body;
    try {
            bcrypt.hash(Password,5,async(err,hash)=>{
                if(err){
                    res.status(400).send({msg:"Something went wrong"})
                }
                if(hash){
                    const User=new UserModel({Username, Avatar, Email, Password:hash})
                    await User.save();
                    res.status(200).send({msg:"Registration successfull!!"})
                }
            })
        
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})


UserRouter.post("/login",async(req,res)=>{
    const {Email, Password}=req.body;
    try {
        const User=await UserModel.findOne({Email})
        if(User){
            bcrypt.compare(Password,User.Password,async(err,result)=>{
                if(result){
                    res.status(200).send({msg:"login successful", token:jwt.sign({"UserName":User.Username},"masai")})
                }
            })
        }else{
            res.status(400).send({msg:"User not found please register first"})
        }
    } catch (error) {
        res.status(400).send({msg:"login failed"})
    }
})

module.exports={UserRouter}