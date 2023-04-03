import { model, Schema } from "mongoose";
import { ISports } from "../interface/sports.interface";

const sportsSchema=new Schema<ISports>({
    name:{type:String,required:true}
})

export default model<ISports>("Sports",sportsSchema)