import { Document, ObjectId } from "mongoose";

export interface IturfDetails extends Document{
    id:string;
    turfId:string|ObjectId
    groundName:string;
    website:string;
    sports:Array<string>;
    image:Array<string>;
    amenities:Array<string>;
    rules:Array<string>;
    price:number;
    slots:string;
}