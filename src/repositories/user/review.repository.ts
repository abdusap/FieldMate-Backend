import { Ireview } from "../../interface/review.interface"
import reviewModel from "../../models/review.model"

class ReviewRepository{

    async addReview(turfId:string,userId:string,title:string,rating:number,message:string):Promise<Ireview>{
          const date=new Date()
          const review=new reviewModel({
            turfId,
            userId,
            title,
            rating,
            message,
            date
          })
          review.save()
          return review
    }

    async allReview(turfId:string):Promise<Ireview|object>{
      const details = await reviewModel.find({turfId})
      return details
    }

    async reviewCount(turfId:string):Promise<number|null>{
      const count = await reviewModel.count({turfId:turfId})
      return count
    }

    async getReview(turfId:string):Promise<Ireview|object>{
      const details = await reviewModel.find({turfId}).sort({rating:-1}).limit(8)
      return details
    }

}
export default ReviewRepository