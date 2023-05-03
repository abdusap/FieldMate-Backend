import { Document } from "mongoose";

export enum Gender {
    MALE = "male",
    FEMALE = "female"
  }

export interface Iuser extends Document{
    id:number;
    name: string;
    mobile: number;
    email: string;
    wallet:number;
    password: string;
    confirmPassword: string;
    gender: Gender,
    image: string,
    status: boolean
}

export interface IUser{
    user:Iuser
}