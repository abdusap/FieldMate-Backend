import slotBookingModel from "../../models/slotBooking.model"
import userModel from "../../models/user.model"



class SlotBookingRepository{

    async getAllBookedSlots(turfId:string,sports:string,date:string):Promise<object>{
        const data = await slotBookingModel.find({turfId:turfId,sports:sports,date:date})
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


}

export default SlotBookingRepository