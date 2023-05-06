import asyncHandler from "express-async-handler";
import SlotBookingService from "../../services/turf/slotBooking.service";

const slotBookingService=new SlotBookingService()

export const getSlotBooking=asyncHandler(async(req,res)=>{
const id:any = req.query.id
const details=await slotBookingService.AllSlotBooking(id)
res.send({details})
})

export const cancelSlot=asyncHandler(async(req,res)=>{
      const id:any=req.query
      await slotBookingService.CancelSlot(id)
      res.send({success:true})
})

export const slotDetails=asyncHandler(async(req,res)=>{
      const id:any=req.query
      const data:any=await slotBookingService.SlotDetails(id)
      const details=data[0]
      res.send({details})   
})

export const dashboardDetails=asyncHandler(async(req,res)=>{
      const {id}:any=req.query
 const details:any=await slotBookingService.GetAllSlotBooking(id)
 const slotBooking=details.slotBooking
 const reviewCount=details.reviewCount
res.send({slotBooking,reviewCount})

})