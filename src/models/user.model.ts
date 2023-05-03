import { model, Schema } from "mongoose";
import { Iuser } from "../interface/user.interface";

const userSchema=new Schema<Iuser>({
    name: {type:String,required:true},
    mobile: {type:Number,required:true},
    email: {type:String,required:true},
    wallet:{type:Number,default:0},
    password: {type:String,required:true},
    gender: {type:String},
    image: {type:String},
    status: {type:Boolean,default:true}
});

export default model<Iuser>("User",userSchema)

