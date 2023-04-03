import UserRepository from "../../repositories/user/user.repository";
import bcrypt from "bcrypt";
import { Iuser } from "../../interface/user.interface";

// const userRepository=new UserRepository()
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
    async verifyUser(email:string,password:string):Promise<boolean|null>{
        const user:Iuser|null=await this.Finduser(email)
            if(user){
                const hashedPassword:string=user.password
                const matchPassword:boolean=await bcrypt.compare(password,hashedPassword)
                return matchPassword
            }   
        else
        return user 
}
}

export default UserService