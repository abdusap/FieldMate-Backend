import asyncHandler from "express-async-handler";
import SportsService from "../../services/user/sports.service";
import LocationService from "../../services/user/locaton.service";
import TurfService from "../../services/user/turf.service";

const sportService=new SportsService()
const locationService=new LocationService()
const turfService = new TurfService()
export const allLocationAndSports=asyncHandler(async(req,res)=>{
      const sports=await sportService.allSports()
      const location=await locationService.getLocation()
      res.send({sports:sports,location:location})
  
    })

    export const allTurf=asyncHandler(async(req,res)=>{
      
      const turfs= await turfService.allTurf()
      res.send({turfs})
    })

    export const turfDetails=asyncHandler(async(req,res)=>{
      console.log(req.query);
      const id:any=req.query.id
      const details=await turfService.TurfDetails(id)
      const {turf,turfDetails}=details
      
      res.send({turf:turf[0],turfDetails:turfDetails[0]})
    })