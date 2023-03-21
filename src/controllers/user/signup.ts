import { NextFunction, Request, Response } from "express";

export const signup=async(
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    console.log('haif')
    console.log(req.body)
}