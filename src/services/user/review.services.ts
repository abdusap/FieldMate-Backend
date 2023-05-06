import { Ireview } from "../../interface/review.interface";
import ReviewRepository from "../../repositories/user/review.repository";

class ReviewService extends ReviewRepository{

    async AddReview(turfId:string,userId:string,title:string,rating:number,message:string):Promise<Ireview>{
            const details = await this.addReview(turfId,userId,title,rating,message)
            return details
    }

    async AllReview(turfId:string):Promise<Ireview | object>{
            const details = await this.allReview(turfId)
            return details
    }
}

export default ReviewService