import { Ilocation } from "../../interface/location.interface";
import LocationRepository from "../../repositories/user/location.repository";

class LocationService extends LocationRepository{

    async getLocation():Promise<Ilocation | object>{
         const data = await this.GetLocation()
         return data
    }
}
export default LocationService