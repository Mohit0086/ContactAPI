import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../model/User.js";
import jwt from "jsonwebtoken";

export const signup = async(req,res)=>{
   const {name,email,password} = req.body;
   
   let checkuser = await User.findOne({email});
   if(!checkuser){
    let hashPassword = await bcrypt.hash(password,10);
    let user = await User.create({
        name,
        email,
        password:hashPassword});
        res.json({
            message:"User registrationn successful",
            status:true,
        });
   }
   else{
    res.json({
        message:"User already exists",
        status:false,
    })
   }
};

export const login = async (req,res) => {
    const {email,password} =  req.body;

    let checkuser = await User.findOne({email});
    if(!checkuser){
        res.json({message:"User not found",
            status:false,
        });
    }else{
        let validUser = await bcrypt.compare(password,checkuser.password);
        if(validUser){
            let token = jwt.sign({userId:checkuser._id}, process.env.SECRET_KEY);
            res.json({message:"Login succesfuuly",status:true,token})
        }
        else{
          res.json({  message:"password is wrong",
            status : false,
          });
        }
    }
};