import { Iadmin } from "../../interface/admin.interface";
import adminModel from "../../models/admin.model";

class authRepository{

async Login(email:string):Promise<Iadmin | null>{
    const details =await adminModel.findOne({email:email})
    return details
}

async findOne(email:string):Promise<Iadmin | null>{
    const details=await adminModel.findOne({email})
    return details
}


}

export default authRepository