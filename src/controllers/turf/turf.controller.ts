import turfValidationSchema from "../../validation/turf.validation";
import TurfService from "../../services/turf/turf.service";
import AppError from "../../error/error";
import { sendMail } from "../../helper/send.mail";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const turfService =new TurfService()


export const jwtChecker=asyncHandler(async(req,res)=>{
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const checker:any=await turfService.JwtChecker(token)
   if(checker!=null){
          if(checker.status){
            res.json({success: true});
          }else{
            throw new AppError(401, "your account has been blocked");
          }
   }else{
    throw new AppError(401, "invalid token");
   }
  

  }else {
    throw new AppError(401, "No authorization");
  } 
})



export const signup=asyncHandler(async(req,res)=>{ 
   try{ 
    const formData = req.body
   const validatedData=await turfValidationSchema.validate(formData)
        const { mobile, email } = validatedData;
        const turfExist = await turfService.FindTurf(mobile,email)
        console.log(turfExist)
        if (turfExist) throw new AppError(409,"User Already Exist")
        else{
          const otp=await sendMail(email,"otp")
        console.log(otp);
        res.json({ success: true ,otp:otp}); 
        }
      }catch(err:any){
        throw new AppError(400,err.message)
      }  
    })


    export const verifyOtp=asyncHandler(async(req,res)=>{ 

      console.log(req.body)
      const orgOTP:number=req.body.OTP
      const enteredOTP:number=parseInt(req.body.EnteredOtp)
      if(orgOTP===enteredOTP){
        console.log('verified')
        const {name,mobile,email,location,gioCoordinates,password}=req.body
          await turfService.CreateTurf(name,mobile,email,location,gioCoordinates,password)
          res.send({ok:true})
      }else{
         throw new AppError(400,"Verification Failed")
      }
    })

    export const login=asyncHandler(async(req,res)=>{ 
  //       const authHeader = req.headers.authorization;
  // console.log(authHeader);
      const {email,password}=req.body
      const Turf=await turfService.Login(email,password)
      if(Turf!=null){
      const {matchStatus,account}=Turf
      if(matchStatus==true){
        const data={id:JSON.parse(JSON.stringify(account._id))}
        const token = jwt.sign(data,process.env.JWT_SECRET as string, { expiresIn: 86400 });
        res.send({success:true,token:token,account:account})
      }
      if(matchStatus==false){
        throw new AppError(401,"Email or Password Incorrect")
        res.send({success:false})
      }
    }
      else{
        throw new AppError(404,"Invalid Details")

      }


    })
   
