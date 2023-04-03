import LocationRepository from "../../repositories/admin/location.repository"



class LocationService extends LocationRepository{  

    async AllLocation():Promise<object>{
        const location=this.getAllLocation()
        return location
       }
    }
    
    
  export default LocationService