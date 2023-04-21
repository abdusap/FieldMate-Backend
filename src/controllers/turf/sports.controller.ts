import asyncHandler from "express-async-handler";
import SportsService from "../../services/turf/sports.service";
import turfDetails from "../../services/turf/turfDetails.service";

const sportsService=new SportsService()
const  turfDetail = new turfDetails()
export const getAllSportsAndDetails=asyncHandler(async(req,res)=>{ 
  console.log(req.query)
  const turfId:any=req.query.id
   const allSports=await sportsService.AllSports()
   const details=await turfDetail.GetTurfDetails(turfId)
  // console.log(details);
    res.send({allSports,details})
  });