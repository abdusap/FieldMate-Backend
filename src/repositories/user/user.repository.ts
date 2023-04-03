import { Iuser } from "../../interface/user.interface";
import userModel from "../../models/user.model";



class UserRepository{
    async CreateUser(
        name:string,
        mobile:number,
        email:string,
        password:string
    ):Promise<Iuser>{   
            const user = new userModel({name,mobile,email,password})
            await user.save();
            return user        
    }


    async Finduser(email:string):Promise <null | Iuser> {
    const user =await userModel.findOne({email:email});
    console.log(user)
    return user
    }
}

export default UserRepository