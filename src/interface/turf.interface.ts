import { Document, ObjectId } from "mongoose";

export interface Iturf extends Document{
    id:string;
    name:string;
    mobile:number;
    email:string;
    location:ObjectId;
    gioCoordinates:string;
    password:string;
    verify:boolean;
    verificationStatus:string;
    status:boolean;
}