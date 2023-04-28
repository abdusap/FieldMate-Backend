import asyncHandler from "express-async-handler";
import SportsService from "../../services/user/sports.service";
import LocationService from "../../services/user/locaton.service";

const sportService=new SportsService()
const locationService=new LocationService()
export const allLocationAndSports=asyncHandler(async(req,res)=>{
      const sports=await sportService.allSports()
      const location=await locationService.getLocation()
      res.send({sports:sports,location:location})
  
    })