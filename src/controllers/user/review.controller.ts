import asyncHandler from "express-async-handler";
import ReviewService from "../../services/user/review.services";

const reviewService=new ReviewService()
export const addReview=asyncHandler(async(req,res)=>{
const{turfId,userId,title,rating,message}=req.body
const review=await reviewService.AddReview(turfId,userId,title,rating,message)
res.send({review})

})

export const getReviews=asyncHandler(async(req,res)=>{
    console.log(req.query);
    const {id}:any=req.query
    const reviews = await reviewService.GetReview(id)
    res.send({reviews})
    })