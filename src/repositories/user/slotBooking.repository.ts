import slotBookingModel from "../../models/slotBooking.model"
import userModel from "../../models/user.model"
import { Types } from 'mongoose';


class SlotBookingRepository{

    async getAllBookedSlots(turfId:string,sports:string,date:string):Promise<object>{
        const data = await slotBookingModel.find({turfId:turfId,sports:sports,date:date,status:true})
        return data
    }

    async bookSlotWallet(userId:string,turfId:string,date:Date,slots:Array<string>,sports:string,total:number,walletAmount:number):Promise<object>{
       const data=new slotBookingModel({
        userId,turfId,sports,date,slots,total,walletAmount
       })
       data.save()
       await userModel.findOneAndUpdate({_id:userId},{$inc:{wallet:-walletAmount}})
       return data
    }

    async bookSlotPayment(userId:string,turfId:string,date:Date,slots:Array<string>,sports:string,total:number,paymentAmount:number):Promise<object>{
       const data=new slotBookingModel({
        userId,turfId,sports,date,slots,total,paymentAmount
       })
       data.save()
       return data
    }

    async bookSlotPaymentAndWallet(userId:string,turfId:string,date:Date,slots:Array<string>,sports:string,total:number,walletAmount:number,paymentAmount:number):Promise<object>{
       const data=new slotBookingModel({
        userId,turfId,sports,date,slots,total,walletAmount,paymentAmount
       })
       data.save()
       return data
    }
    async allBooking(id:string):Promise<object>{
      const data=await slotBookingModel.aggregate([
         {
            $match:{
               userId:new Types.ObjectId(id)
            }
         },
         {
            $lookup:{
               from:'sports',
               localField:'sports',
               foreignField:'_id',
               as:"sports_info"
            }
         },
         {
            $project:{
               turfId:1,
               userId:1,
               date:1,
               slots:1,
               status:1,
               sports: { $arrayElemAt: [ "$sports_info.name", 0 ] }
           }
         },
         {
            $lookup:{
               from:'turfdetails',
               localField:'turfId',
               foreignField:'turfId',
               as:"turf_info"
            }
         },
         {
            $project:{
               turfId:1,
               userId:1,
               date:1,
               slots:1,
               status:1,
               sports:1,
               groundName: { $arrayElemAt: [ "$turf_info.groundName", 0 ] }
           }
         },
      ])
      return data
    }

    async cancelBooking(id:string):Promise<object | null>{
      const details:any=await slotBookingModel.findByIdAndUpdate(
         id ,
         [{ $set: { status: { $not: ["$status"] } } }],
        { new: true }
    )
     const userId=details.userId
     const total=details.total
     const data=await userModel.findByIdAndUpdate(userId,{$inc:{wallet:total}})
     return data
    }

}

export default SlotBookingRepository