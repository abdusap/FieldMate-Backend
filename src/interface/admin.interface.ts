import { Document } from "mongoose";

export interface Iadmin extends Document{
    id:string;
    email:string;
    password:string;
}