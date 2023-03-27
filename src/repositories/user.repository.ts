import userModel from "../models/user.model";
import { IUser } from "../interface/user.interface";
import { Iuser } from "../interface/user.interface";

class UserRepository {
    async createUser(
        name:string,
        mobile:number,
        email:string,
        password:string
    ):Promise<Iuser>{
     
            const user = new userModel({name,mobile,email,password})
            await user.save();
            return user
        
    }

    async finduser(email:string):Promise <null | Iuser> {
    const user =await userModel.findOne({email:email});
    return user
    }

    
}

export default UserRepository