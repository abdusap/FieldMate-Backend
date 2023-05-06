import asyncHandler from "express-async-handler";
import ReviewService from "../../services/user/review.services";

const reviewService=new ReviewService()
export const allReview=asyncHandler(async(req,res)=>{ 
const {id}:any = req.query
const reviews=await reviewService.AllReview(id)
res.send({reviews})
})