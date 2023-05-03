import SlotBookingRepository from "../../repositories/user/slotBooking.repository";

class SlotBookingService extends SlotBookingRepository{
    async bookSlot(userId:string,turfId:string,date:Date,slots:Array<string>,sports:string,total:number,walletAmount:number):Promise<object>{
        const data= await this.bookSlotWallet(userId,turfId,date,slots,sports,total,walletAmount)
        return data
     }

    async BookSlotPayment(userId:string,turfId:string,date:Date,slots:Array<string>,sports:string,total:number,paymentAmount:number):Promise<object>{
        const data= await this.bookSlotPayment(userId,turfId,date,slots,sports,total,paymentAmount)
        return data
     }

    async BookSlotPaymentAndWallet(userId:string,turfId:string,date:Date,slots:Array<string>,sports:string,total:number,walletAmount:number,paymentAmount:number):Promise<object>{
        const data= await this.bookSlotPaymentAndWallet(userId,turfId,date,slots,sports,total,walletAmount,paymentAmount)
        return data
     }


}

export default SlotBookingService