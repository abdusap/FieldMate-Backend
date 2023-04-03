import { NextFunction, Request, Response } from "express";
import turfValidationSchema from "../../validation/turf.validation";
import { Iturf } from "../../interface/turf.interface";
import TurfService from "../../services/turf/turf.service";
import { number, string } from "yup";
import AppError from "../../error/error";
import { sendMail } from "../../helper/send.mail";


const turfService =new TurfService()

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
   try{ const formData = req.body;
    turfValidationSchema
      .validate(formData)
      .then(async (validatedData) => {
        const { name, mobile, email,location,gioCoordinates,password } = validatedData;
        const otp =await sendMail(email,"approved")
        console.log(otp);
        
        const turfExist = await turfService.FindTurf(mobile,email)
        console.log(turfExist)
        if (turfExist) res.send({ success: false });
        else{
          
          const newTurf = await turfService.CreateTurf(name,mobile,email,location,gioCoordinates,password)
        console.log(newTurf);
        res.send({ success: true });
        
        }
          // sendVerificationToken(mobile).then((status) => {
          //   if (status) res.send({ success: true });
          // });
      }).catch(err=>{
           throw  AppError.validationError(err.message)
      })
      
      
   
    }
      catch(err:any){

        next(err)
        // throw new AppError(500,err.message);
  // console.log(err)
      }
  };