import sportsModel from "../../models/sports.model";
import { ISports } from "../../interface/sports.interface";
import { ObjectId } from "mongodb";

class SportsRepository{
    async addSports(name:string):Promise <ISports>{
        const sports=new sportsModel({name})
        await sports.save();
        return sports
    }

    async findSports(id:string):Promise<ISports|null>{
        const objectId=new ObjectId(id);
        const locationData=await sportsModel.findById(objectId)
         return locationData
    }

    // async findAllSports():Promise<object>{
    //     const sportsAllData=await sportsModel.find()
    //      return sportsAllData
    // }

    async editSports(id:string,name:string):Promise<ISports|null>{
        const objectId=new ObjectId(id);
        const sportsData=await sportsModel.findByIdAndUpdate(objectId,{$set:{name:name}})
         return sportsData
    }

    async getAllSports():Promise<object>{
        const sportsData=await sportsModel.find()
         return sportsData
    }
}

export default SportsRepository