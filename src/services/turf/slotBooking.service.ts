import SlotBookingRepository from "../../repositories/turf/slotBooking.repository"
import ReviewRepository from "../../repositories/user/review.repository"

const reviewRepository=new ReviewRepository()

class SlotBookingService extends SlotBookingRepository{

    async AllSlotBooking(id:string):Promise<object>{
        const details=await this.allSlotBooking(id)
        return details
       }

    async CancelSlot(id:string):Promise<object|null>{
        const details=await this.cancelSlot(id)
        return details
       }

    async SlotDetails(id:string):Promise<object|null>{
        const details=await this.slotDetails(id)
        return details
       }

       async GetAllSlotBooking(id:string):Promise<object|null>{
        const details=await this.getAllSlotBooking(id)
        const reviewCount=await reviewRepository.reviewCount(id)
        return {
            "slotBooking":details,
            "reviewCount":reviewCount
        }
        
       }
}

export default SlotBookingService