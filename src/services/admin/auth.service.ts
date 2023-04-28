import { Iadmin } from "../../interface/admin.interface"
import authRepository from "../../repositories/admin/auth.repository"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthRepository=new authRepository()
class authService{

    async login(email:string,password:string): Promise<Iadmin | null |boolean> {
        const details= await AuthRepository.Login(email)
        if(details){
            const hashedPassword:string=details.password
            const matchPassword:boolean=await bcrypt.compare(password,hashedPassword)
            return matchPassword
        }else{
           return details
        }
    }

    async JwtChecker(token:string):Promise<any>{
        const decoded:any = jwt.verify(token, process.env.JWT_SECRET as string);
        if(decoded){
            const email=decoded.email
            const Data=await AuthRepository.findOne(email)
            return Data 
          }else{
            const decode=false
            return decode
          }
    }


}

export default authService