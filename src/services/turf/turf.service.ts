import { Schema } from "mongoose";
import { Iturf } from "../../interface/turf.interface";
import TurfRepository from "../../repositories/turf/turf.repository";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";



class TurfService extends TurfRepository{
    async JwtChecker(token:string):Promise<any>{
        const decoded:any = jwt.verify(token, process.env.JWT_SECRET as string);
        if(decoded){
            const id=decoded.id
            const turfData=await this.findTurfById(id)
            return turfData 
          }else{
            const decode=false
            return decode
          }
    }


    async CreateTurf(name: string, mobile: number, email: string, location: string, gioCoordinates: string, password: string): Promise<Iturf> {
        const hashedPassword=await bcrypt.hash(password,10);
        const turf=await this.createTurf(name,mobile,email,location,gioCoordinates,hashedPassword)
        return turf
    }

    async FindTurf(mobile:number, email:string):Promise<Iturf | null>{
        const turf=await this.findTurf(email,mobile)
        return turf
    }


    
    async Login(email:string,password:string):Promise<any>{
        const accountDetail=await this.loginTurf(email)
        if(accountDetail){
          const hashedPassword:string=accountDetail.password
          const matchPassword:boolean=await bcrypt.compare(password,hashedPassword)
          return {
            'matchStatus':matchPassword,'account':accountDetail}
        }else
           return null
    }
    
   
    

}


export default TurfService