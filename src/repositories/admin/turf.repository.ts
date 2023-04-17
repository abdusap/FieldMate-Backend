import turfModel from "../../models/turf.model"

class TurfRepository{

    async allTurf():Promise <any>{
        const allTurf=await turfModel.find()
        return allTurf
    }
}

export default TurfRepository