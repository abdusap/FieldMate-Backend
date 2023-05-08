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
    async AllBooking(id:string):Promise<object>{
        const data:any= await this.allBooking(id)
//         const now = new Date();

// const pastBookings = data.filter((booking:any) => {
//   return booking.date < now;
// });

// const presentBookings = data.filter((booking:any) => {
//   return booking.date >= now && !isSameDay(booking.date, now);
// });

const now = new Date();
// const pastBookings:any = [];
// const presentBookings:any = [];

// data.forEach((booking:any) => {
//     const bookingDate = new Date(booking.date);
//     if (bookingDate < now) {
//         pastBookings.push(booking);
//     } else {
//         const isSameDay = bookingDate.getFullYear() === now.getFullYear() &&
//             bookingDate.getMonth() === now.getMonth() &&
//             bookingDate.getDate() === now.getDate();
//         if (isSameDay) {
//             presentBookings.push(booking);
//         } else {
//             presentBookings.push(booking);
//         }
//     }
// });
const pastBookings = data.filter((booking:any) => {
  return new Date(booking.date) < new Date(now.toDateString());
});

const presentBookings = data.filter((booking:any) => {
  const bookingDate = new Date(booking.date);
  const sameDay = bookingDate.getFullYear() === now.getFullYear() &&
      bookingDate.getMonth() === now.getMonth() &&
      bookingDate.getDate() === now.getDate();
  return sameDay || bookingDate >= new Date(now.toDateString());
});
console.log(pastBookings);
console.log(presentBookings);
        return {
            "pastBooking":pastBookings,
            "presentBooking":presentBookings
        }
     }


 

     async CancelBooking(id:string):Promise<object | null>{
      const data:any= await this.cancelBooking(id)
      return data
     }

}

function isSameDay(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
}

export default SlotBookingService