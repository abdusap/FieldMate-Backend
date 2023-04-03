import { Schema } from "mongoose";
import { Iturf } from "../../interface/turf.interface";
import TurfRepository from "../../repositories/turf/turf.repository";
import bcrypt from "bcrypt";


class TurfService extends TurfRepository{
    async CreateTurf(name: string, mobile: number, email: string, location: string, gioCoordinates: string, password: string): Promise<Iturf> {
        const hashedPassword=await bcrypt.hash(password,10);
        const turf=await this.createTurf(name,mobile,email,location,gioCoordinates,hashedPassword)
        return turf
    }

    async FindTurf(mobile:number, email:string):Promise<Iturf | null>{
        const turf=await this.findTurf(email,mobile)
        return turf
    }
}

export default TurfService