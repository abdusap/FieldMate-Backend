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

    export const availableSports=asyncHandler(async(req,res)=>{
      const id:any=req.query.id
      const sports=await turfService.AvailableSports(id)
      // console.log(sports);
      res.send({sports})
    })

    export const availableSlots=asyncHandler(async(req,res)=>{
      const {turfId,sports,date}:any=req.query
console.log(turfId);
console.log(sports);
console.log(date);
const slots=await turfService.AvailableSlots(turfId,sports,date)
const bookedSlots=slots.bookedSlots
const allSlots=slots.allSlots.slots
if(bookedSlots.length==0){
     res.send({allSlots,allSlot:true})
}else{
  console.log(bookedSlots);
  const BookedSlots:Array<string>=[]
  bookedSlots.forEach((element:any)=> {
    element.slots.forEach((data:string)=>{
      BookedSlots.push(data)
    })
  });
  res.send({allSlots,BookedSlots,bookedSlot:true})
}
    })