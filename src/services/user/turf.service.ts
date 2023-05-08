import SlotBookingRepository from "../../repositories/user/slotBooking.repository"
import TurfRepository from "../../repositories/user/turf.repository"


const slotBookingRepository=new SlotBookingRepository()
class TurfService extends TurfRepository{

    async  allTurf(search:string,sports:string,location:string):Promise<object>{
        const data=await this.getAllTurf(search,sports,location)
        
        return data
    }


     async TurfDetails(id:string):Promise<object|any>{
      const turf=await this.turfDetails(id)
      const Turf=await this.turfData(id)
      return {
        "turf":Turf,
        "turfDetails":turf
      }
    }

    async AvailableSports(id:string):Promise<object>{
      const details=await this.availableSports(id)
      return details
    }

    async AvailableSlots(turfId:string,sports:string,date:string):Promise<object|any>{
      const getAllBookedSlots=await slotBookingRepository.getAllBookedSlots(turfId,sports,date)
      const getAllSlots=await this.getSlots(turfId)
      return{
        "bookedSlots":getAllBookedSlots,
        "allSlots":getAllSlots
      }

    }


}
export default TurfService