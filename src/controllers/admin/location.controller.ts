import { NextFunction, Request, Response } from "express";
import LocationService from "../../services/admin/location.service";
import asyncHandler from "express-async-handler";
import AppError from "../../error/error";

 const locationService=new LocationService()
 
 export const addLocation=asyncHandler(async(req,res)=>{ 
    const { name } = req.body;
    const location = await locationService.AddLocation(name)
    console.log(location)
    if(location)
    res.json({ success: true });
    else
    throw new AppError(409,"Location Exist")
    
  })


  export const getLocationAndSports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data = await locationService.GetLocationAndSport()
    res.json({ data });
  };
  

  export const findLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.body;
    console.log(id);
    const data = await locationService.FindLocation(id)
    console.log(data);
    res.json({ data });
  };
  

  export const editLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id, name } = req.body;
    const data = await locationService.EditLocation(id,name)
    // console.log(data)
    res.json({ data, success: true });
  };

 

  export const BlockLocation=asyncHandler(async(req,res)=>{ 
    const { id}:any = req.query 
    const data=await locationService.BlockLocation(id)
    if(data){
      res.send({success:true})
    }
  })
