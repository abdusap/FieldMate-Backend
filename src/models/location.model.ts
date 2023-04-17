import { model, Schema } from "mongoose";
import { Ilocation } from "../interface/location.interface";

const locationSchema=new Schema<Ilocation>({
    name:{type:String,required:true},
    status:{type:Boolean,default:true}
})

export default model<Ilocation>("Location",locationSchema)