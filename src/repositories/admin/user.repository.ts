import { IUser, Iuser } from "../../interface/user.interface"
import userModel from "../../models/user.model"


class UserRepository{

    async getAllUser():Promise<object | null>{
        const details=await userModel.find()
        return details
    }

    async blockUser(id:string):Promise<Iuser | null >{
        const user=await userModel.findByIdAndUpdate(
               id ,
               [{ $set: { status: { $not: ["$status"] } } }],
              { new: true }
          )
          return user      
  }

}
export default UserRepository