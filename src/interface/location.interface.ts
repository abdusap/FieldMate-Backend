import { Document, Types } from "mongoose";

export interface Ilocation extends Document{
    id:Types.ObjectId;
    name:string;
    status:boolean;
}