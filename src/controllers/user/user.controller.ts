import { NextFunction, Request, Response } from "express";
import { Iuser } from "../../interface/user.interface";
import userValidation from "../../validation/user.validation";
import AuthService from "../../services/user/auth.user.services";
import { checkVerificationToken, sendVerificationToken } from "../../config/twilio";



const authService= new AuthService();

export const signup=async(
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    const formData:Iuser=req.body
    const mobile:number=req.body.mobile
     userValidation.validate(formData).then(async(validatedData)=>{
        const {name,mobile,email,password}=validatedData
        const authUser= await authService.finduser(name,mobile,email,password)
        if(authUser)
        res.send({success:false})
        else
        sendVerificationToken(mobile).then((status)=>{
            if(status)
            res.send({success:true})
        })
     }).catch((validationErrors)=>{
        console.log(validationErrors.message)
     })
}

export const verityOtp=async(
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    const {otp,mobile,name,email,password}=req.body    
    const checkOtp=await checkVerificationToken(otp,mobile)
    if(checkOtp){
        await authService.createUser(name,mobile,email,password)
        res.json({ok:true})
    }
    else
    res.json({ok:false})
}

export const login=async(
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    const{email,password}=req.body
    console.log(req.body)
    const user=await authService.verifyUser(email,password)
    console.log(user)
    if (user === null) {
        res.json({ message: 'Invalid user' });
      } else if (user === true) {
        res.json({ verify: true, message: 'true' });
      } else if (user === false) {
        res.json({ verify: false, message: 'Email or Password Incorrect'});
      } else {
        res.json({ message: 'Invalid user'});
      }
}