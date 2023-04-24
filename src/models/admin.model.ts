import { model,Schema } from "mongoose";
import { Iadmin } from "../interface/admin.interface";

const adminSchema=new Schema<Iadmin>({
    email:{type:String},
    password:{type:String}
})

export default model<Iadmin>("Admin",adminSchema)