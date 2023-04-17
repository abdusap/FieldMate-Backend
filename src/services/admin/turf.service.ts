import TurfRepository from "../../repositories/admin/turf.repository";

class turfService extends TurfRepository{

    async AllTurf():Promise<any>{
        const allTurf=await this.allTurf()
        return allTurf
    }
}

export default turfService