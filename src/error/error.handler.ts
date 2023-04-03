import { NextFunction, Request,Response } from "express"
// import { TokenExpiredError } from "jsonwebtoken";
import AppError from "./error";
const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    
    console.log('1');
     console.log(err);
    
    if(err instanceof AppError){
console.log('2')
      return  res.status(err.statusCode).json({error:{success:false,message:err.message}})

    }
    // else if(err instanceof TokenExpiredError){

    //     res.status(401).json({error:{success:false,tokenExpired:true,message:'token expired'}})
    // }
    else{
        console.log('error')
        res.status(500).json({error:{success:false,message:'something went wrong'}})
    }

}  



export default errorHandler