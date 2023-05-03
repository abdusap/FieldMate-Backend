import UserRepository from "../../repositories/user/user.repository";
import bcrypt from "bcrypt";
import { Iuser } from "../../interface/user.interface";
import TurfRepository from "../../repositories/user/turf.repository";

// const userRepository=new UserRepository()
const turfRepository=new TurfRepository()
class UserService extends UserRepository{
    async finduser(name:string, mobile:number,email:string):Promise<Iuser|null>{
        const checkUserDupe=await this.Finduser(email)
        return checkUserDupe
    }
    async createUser(name:string,mobile:number,email:string,password:string):Promise<object>{
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await this.CreateUser(name,mobile,email,hashedPassword)
        return user
    }
    async verifyUser(email:string,password:string):Promise<boolean|null |object>{
        const user:Iuser|null=await this.Finduser(email)
            if(user){
                const hashedPassword:string=user.password
                const matchPassword:boolean=await bcrypt.compare(password,hashedPassword)
                return {"matchPassword":matchPassword,
                         "user":user }
            }   
        else
        return user 
}

    async getWalletAndPrice(turfId:string,userId:string):Promise<object | any>{
        const wallet=await this.Getuser(userId)
        const slotPrice=await turfRepository.getSlots(turfId)
        return {
            "user":wallet,
            "slotPrice":slotPrice
        }
    }


}

export default UserService