import LocationRepository from "../../repositories/admin/location.repository"
import { Ilocation } from "../../interface/location.interface"
import SportsRepository from "../../repositories/admin/sports.repository"

// const locationRepository=new LocationRepository()
const sportsRepository=new SportsRepository()
class LocationService extends LocationRepository{  

    async AddLocation(name:string):Promise<Ilocation | boolean>{
        const locatonExist=await this.isLocationExist(name)
        if(locatonExist){
        const exist=false
           return exist
        }
        const location=this.addLocation(name)
        return location
       }

       async FindLocation(id:string):Promise<Ilocation | null>{  
        const data=this.findLocation(id)
        return data
    }
    async GetLocationAndSport():Promise<object>{   
        const allSports=await sportsRepository.getAllSports()
        const allLocation=await this.getAllLocation()
        const data={
            location:allLocation,
            sports:allSports
        }
        return data
    }
    async EditLocation(id:string,name:string):Promise<Ilocation | null>{  
        const data=this.editLocation(id,name)
        return data
    }

    // async GetAllLocation():Promise<object>{   
    //     const data=this.findAllLocation()
    //     return data
    // }
    // async GetLocationAndSport():Promise<any>{   
    //     const data=adminRepositories.getLocationAndSports()
    //     return data
    // }
    
}
export default LocationService