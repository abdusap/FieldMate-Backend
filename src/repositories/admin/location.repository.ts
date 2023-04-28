import locationModel from "../../models/location.model";
import { Ilocation } from "../../interface/location.interface";
import { ObjectId } from "mongodb";


class LocationRepository{

    async addLocation(name:string):Promise <Ilocation>{
        const location=new locationModel({name})
        await location.save();
        return location
    }

    async isLocationExist(name:string):Promise <Ilocation|null>{
        const locationExist=await locationModel.findOne({name:name})        
        return locationExist
    }
     
    async findLocation(id:string):Promise<Ilocation|null>{
        const objectId=new ObjectId(id)
        const locationData=await locationModel.findById(objectId)
         return locationData
    }

    async getAllLocation():Promise<object>{
        const AllLocationData=await locationModel.find()
         return AllLocationData
    }

    async editLocation(id:string,name:string):Promise<Ilocation|null>{
        const objectId=new ObjectId(id);
        const locationData=await locationModel.findByIdAndUpdate(objectId,{$set:{name:name}})
         return locationData
    }

    async blockLocation(id:string):Promise<Ilocation | null >{
          const location=await locationModel.findByIdAndUpdate(
                 id ,
                 [{ $set: { status: { $not: ["$status"] } } }],
                { new: true }
            )
            return location      
    }
    
}

export default LocationRepository