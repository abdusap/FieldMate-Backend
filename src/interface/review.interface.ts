import { Document, ObjectId } from "mongoose";

export interface Ireview extends Document{
    _id:ObjectId;
    userId:ObjectId | string;
    turfId:ObjectId | string;
    title:string;
    rating:number;
    message:string;
    date:Date;
}