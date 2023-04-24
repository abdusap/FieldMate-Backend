import { Iadmin } from "../../interface/admin.interface"
import authRepository from "../../repositories/admin/auth.repository"
import bcrypt from "bcrypt";

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


}

export default authService