import { Document, ObjectId } from "mongoose";

export interface IslotBooking extends Document{
    id:string;
    userId:string|ObjectId;
    turfId:string|ObjectId;
    sports:string|ObjectId;
    date:Date;
    slots:Array<string>;
    total:number;
    walletAmount:number;
    paymentAmount:number;
    status:boolean;
}