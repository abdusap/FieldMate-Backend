import { NextFunction, Request, Response } from "express";
import SportsService from "../../services/admin/sports.service";
import asyncHandler from "express-async-handler";
import AppError from "../../error/error";


const sportsService=new SportsService()

export const addSports=asyncHandler(async(req,res)=>{ 
    const { name } = req.body;
   const sports= await sportsService.AddSport(name);
   if(sports)
    res.json({ success: true });
    else
    throw new AppError(409,"Sports Exist")
  });
  

  export const findSports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.body;
    console.log(id);
    const data = await sportsService.FindSports(id);
    console.log(data);
    res.json({ data });
  };

  export const editSports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id, name } = req.body;
    const data = await sportsService.EditSports(id,name)
    // console.log(data)
    res.json({ data, success: true });
  };
  