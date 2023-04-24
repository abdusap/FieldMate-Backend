import asyncHandler from "express-async-handler";
import authService from "../../services/admin/auth.service";
import AppError from "../../error/error";
import jwt from "jsonwebtoken";

const AuthService=new authService()
export const login=asyncHandler(async(req,res)=>{ 
 const {email,password}=req.body
    const passwordMatch=await AuthService.login(email,password)
   if(passwordMatch){
    const data={email:email}
    const token = jwt.sign(data,process.env.JWT_SECRET as string, { expiresIn: 86400 });
       res.json({success:true,token:token})
    }
   else if(passwordMatch==null){
       throw new AppError(404,"Invalid user")
    }
   else{
       throw new AppError(401,"Email or Password Incorrect")
    }
  })