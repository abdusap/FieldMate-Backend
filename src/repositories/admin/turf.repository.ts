import turfModel from "../../models/turf.model"
import { Iturf } from "../../interface/turf.interface"

class TurfRepository{

    async allTurf():Promise <any>{
        const allTurf=await turfModel.find({verify:false})
        return allTurf
    }

    async acceptTurf(id:string):Promise<Iturf | null>{
        const turf=await turfModel.findOneAndUpdate({_id:id},{$set:{verify:true,verificationStatus:"approved"}})
        return turf
    }
    async rejectTurf(id:string):Promise<Iturf | null>{
        const turf=await turfModel.findOneAndUpdate({_id:id},{$set:{verify:false,verificationStatus:"rejected"}})
        return turf
    }
}
export default TurfRepository