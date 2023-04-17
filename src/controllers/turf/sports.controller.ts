import asyncHandler from "express-async-handler";
import SportsService from "../../services/turf/sports.service";

const sportsService=new SportsService()
export const getAllSports=asyncHandler(async(req,res)=>{ 
   const allSports=await sportsService.AllSports()
    res.send({allSports})
  });