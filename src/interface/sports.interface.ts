import { Document, Types } from "mongoose";

export interface ISports extends Document{
    id:Types.ObjectId;
    name:string;
}