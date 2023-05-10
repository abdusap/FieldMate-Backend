import { IslotBooking } from "../../interface/slotBooking.interface";
import slotBookingModel from "../../models/slotBooking.model"

import { Types } from 'mongoose';
import userModel from "../../models/user.model";
class SlotBookingRepository{
    async allSlotBooking(id:string):Promise<object|any>{
        const details=await slotBookingModel.aggregate([
            {
                $match:{
                    turfId:new Types.ObjectId(id)
                }
            },
            {
                $lookup:{
                    from:"sports",
                    localField:"sports",
                    foreignField:"_id",
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
                    total:1,
                    sports:{ $arrayElemAt: [ "$sports_info.name", 0 ] }
                    
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"userId",
                    foreignField:"_id",
                    as:"user_info"
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
                    total:1,
                    name:{ $arrayElemAt: [ "$user_info.name", 0 ] },
                    mobile:{ $arrayElemAt: [ "$user_info.mobile", 0 ] }
                    
                }
            },
        ])
        return details
    }

    async cancelSlot(id:string):Promise<IslotBooking | null >{
        const details:any=await slotBookingModel.findByIdAndUpdate(
            new Types.ObjectId(id) ,
               [{ $set: { status: { $not: ["$status"] } } }],
              { new: true }
          )

          const userId=details.userId
          const total=details.total
          const data:any=await userModel.findByIdAndUpdate(userId,{$inc:{wallet:total}})
          return data     
  }

  async slotDetails(id:string):Promise<object|any>{
    const details=await slotBookingModel.aggregate([
        {
            $match:{
                _id:new Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from:"sports",
                localField:"sports",
                foreignField:"_id",
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
                total:1,
                paymentAmount:1,
                walletAmount:1,
                sports:{ $arrayElemAt: [ "$sports_info.name", 0 ] }
                
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"user_info"
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
                total:1,
                paymentAmount:1,
                walletAmount:1,
                name:{ $arrayElemAt: [ "$user_info.name", 0 ] },
                mobile:{ $arrayElemAt: [ "$user_info.mobile", 0 ] }
                
            }
        },
    ])
    return details
}

async getAllSlotBooking(id:string):Promise<object|any>{
    const data = await slotBookingModel.find({turfId:id})
    return data
}

}
export default SlotBookingRepository