import { model, Types,Schema } from "mongoose";
import { Iturf } from "../interface/turf.interface";

const turfSchema=new Schema<Iturf>({
    name:{type:String,required:[true,'name is require']},
    mobile:{type:Number,required:[true,'mobile is required']},
    email:{type:String,required:[true,'email is required']},
    location:{type:Types.ObjectId,required:[true,'location is required']},
    gioCoordinates:{type:String,required:[true,'coordinates is required']},
    password:{type:String,required:[true,'password is required']},
    verify:{type:Boolean,required:true,default:false},
    verificationStatus:{type:String,required:true,default:"Pending"},
    status:{type:Boolean,required:true,default:true}

})

export default model<Iturf>("Turfs",turfSchema)