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
    return user
    }

    async Getuser(id:string):Promise <null | Iuser> {
    const user =await userModel.findById(id);
    return user
    }

    async updateName(id:string,name:string):Promise <null | Iuser> {
    const user =await userModel.findByIdAndUpdate(id,{$set:{name:name}})
    return user
    }

    async updateImage(id:string,image:string):Promise <null | Iuser> {
    const user =await userModel.findByIdAndUpdate(id,{$set:{image:image}},{upsert:true,new:true})
    return user
    }
}

export default UserRepository