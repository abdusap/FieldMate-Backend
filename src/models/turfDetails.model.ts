import { model, Types,Schema } from "mongoose";
// import { Iturf } from "../interface/turf.interface";
import { IturfDetails } from "../interface/turfDetails.interface";

const turfDetailsSchema=new Schema<IturfDetails>({
    turfId:{type:Types.ObjectId},
    groundName:{type:String},
    website:{type:String},
    sports:{type:[Types.ObjectId]},
    image:{type:[String]},
    amenities:{type:[String]},
    rules:{type:[String]},
    price:{type:Number},
    slots:{type:[String]}

})

export default model<IturfDetails>("TurfDetails",turfDetailsSchema)