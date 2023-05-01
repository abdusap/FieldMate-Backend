import TurfRepository from "../../repositories/user/turf.repository"

class TurfService extends TurfRepository{

    async  allTurf():Promise<object>{
        const data=await this.getAllTurf()
        return data
    }


     async TurfDetails(id:string):Promise<object|any>{
      const turf=await this.turfDetails(id)
      const Turf=await this.turfData(id)
      return {
        "turf":Turf,
        "turfDetails":turf
      }
    }
}
export default TurfService