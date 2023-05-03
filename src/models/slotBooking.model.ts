import { model, Types,Schema } from "mongoose";
import { IslotBooking } from "../interface/slotBooking.interface";

const slotBookingSchema=new Schema<IslotBooking>({
    userId:{type:Types.ObjectId},
    turfId:{type:Types.ObjectId},
    sports:{type:Types.ObjectId},
    date:{type:Date},
    slots:{type:[String]},
    total:{type:Number},
    walletAmount:{type:Number,default:0},
    paymentAmount:{type:Number,default:0},
    status:{type:Boolean,default:true},
   

})

export default model<IslotBooking>("SlotBooking",slotBookingSchema)

