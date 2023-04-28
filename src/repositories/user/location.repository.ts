import { Ilocation } from "../../interface/location.interface";
import locationModel from "../../models/location.model";

class LocationRepository{
 async GetLocation():Promise<Ilocation | object>{
    const details=await locationModel.find()
    return details
 }
 

}

export default LocationRepository