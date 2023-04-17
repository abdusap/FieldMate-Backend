import { ObjectId } from "mongoose";
import { Iturf } from "../../interface/turf.interface";
import turfModel from "../../models/turf.model";

class TurfRepository{
    async createTurf(
        name:string,
        mobile:number,
        email:string,
        location:string,
        gioCoordinates:string,
        password:string
    ):Promise<Iturf>{
        const turf = new turfModel({name,mobile,email,location,gioCoordinates,password})
        await turf.save();
        return turf
    }

    async findTurf(
        email:string,
        mobile:number
    ):Promise< Iturf | any> {
        const turf = await turfModel.findOne({
            $or: [{ email: email }, { mobile: mobile }]
          });
        return turf
    }

    async loginTurf(email:string):Promise<Iturf | null>{
        const details=await turfModel.findOne({email:email})
        return details
    }
}

export default TurfRepository