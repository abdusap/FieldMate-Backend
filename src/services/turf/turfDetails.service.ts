import { IturfDetails } from "../../interface/turfDetails.interface";
import TurfDetailsRepository from "../../repositories/turf/turfDetails.repository";

// const turfDetailsRepository=new TurfDetailsRepository

class turfDetails extends TurfDetailsRepository{
   
   async AddTurfDetails(groundName:string,website:string,sports:Array<string>,images:Array<string>): Promise<IturfDetails> {
    const details=await this.addTurfDetails(groundName,website,sports,images)
      return details
}


}

export default turfDetails