import { model,Types, Schema } from "mongoose";
import { Ireview } from "../interface/review.interface";


const reviewSchema=new Schema<Ireview>({
    turfId: {type:Types.ObjectId,required:true},
    userId: {type:Types.ObjectId,required:true},
    title: {type:String,required:true},
    rating:{type:Number,required:true},
    message: {type:String,required:true},
    date: {type:Date},
});

export default model<Ireview>("Review",reviewSchema)

