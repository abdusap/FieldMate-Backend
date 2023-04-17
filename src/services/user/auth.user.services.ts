// import UserRepository from "../../repositories/user.repository"
import UserRepository from "../../repositories/user/user.repository";
import bcrypt from "bcrypt";
import { Iuser, } from "../../interface/user.interface";

const userRepository=new UserRepository()

class AuthService {
     
    async finduser(name:string, mobile:number,email:string):Promise<Iuser|null>{
        const checkUserDupe=await userRepository.Finduser(email)
        return checkUserDupe
    }

    async createUser(name:string,mobile:number,email:string,password:string):Promise<object>{
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await userRepository.CreateUser(name,mobile,email,hashedPassword)
        return user
    }

    async verifyUser(email:string,password:string):Promise<boolean|null>{
        const user:Iuser|null=await userRepository.Finduser(email)
            if(user){
                const hashedPassword:string=user.password
                const matchPassword:boolean=await bcrypt.compare(password,hashedPassword)
                return matchPassword
            }   
        else
        return user 
}
}

export default AuthService 