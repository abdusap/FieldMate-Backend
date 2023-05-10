import { IturfDetails } from "../../interface/turfDetails.interface";
import turfModel from "../../models/turf.model";
import turfDetailsModel from "../../models/turfDetails.model";
import { Types } from 'mongoose';


class TurfDetailsRepository{
    async addTurfDetails(
        turfID:string,
        groundName:string,
        website:string,
        sport:Array<string>,
        image:Array<string>
    ):Promise<IturfDetails |any>{
        const sports = sport.map(sport =>new Types.ObjectId(sport));
        const turfId=new Types.ObjectId(turfID)
        if(image.length===0){

            const turfDetails=await turfDetailsModel.findOneAndUpdate(
                {turfId},
                {$set:{turfId,groundName,website,sports}},
                { upsert: true, new: true }
                )
                return turfDetails
            }
            if(image.length!==0){
               const turfDetails = await turfDetailsModel.findOneAndUpdate(
                    { turfId },
                    { $push: { image: { $each: image } }, $set: { turfId, groundName, website, sports } },
                    { upsert: true, new: true }
                  );
                  return turfDetails
            }
    }
    async addAmenity(
        turfId:string,
        amenity:Array<string>):Promise<IturfDetails|null>{
            const details=await turfDetailsModel.findOneAndUpdate({turfId:new Types.ObjectId(turfId)},{$set:{amenities:amenity}})
          return details
        }
    async addRules(
        turfId:string,
        rules:Array<string>):Promise<IturfDetails|null>{
            const details=await turfDetailsModel.findOneAndUpdate({turfId:new Types.ObjectId(turfId)},{$set:{rules:rules}})
          return details
        }
    async getTurfDetails(
        turfId:string):Promise<object|null>{
            const data=await turfModel.aggregate([
                {$match:{_id:new Types.ObjectId(turfId)}},
                {$lookup:{
                    from:"locations",
                    localField:"location",
                    foreignField:"_id",
                    as:"locationName"
                }},
                {$project:{
                    email:1,
                    mobile:1,
                    gioCoordinates:1,
                    location: { $arrayElemAt: [ "$locationName.name", 0 ] }
                   
                }}
            ])
            const details=await turfDetailsModel.findOne({turfId:turfId})
          return {
            turf:data,
            details:details
        }
        }
        async addSlot(
            turfId:string,
            slots:Array<string>,
            price:number):Promise<IturfDetails|null>{
                const details=await turfDetailsModel.findOneAndUpdate({turfId:new Types.ObjectId(turfId)},{$set:{price:price,slots:slots}})
              return details
            }
        async getSlot(
            turfId:string):Promise<IturfDetails|null>{
                const details=await turfDetailsModel.findOne({turfId:new Types.ObjectId(turfId)})
              return details
            }

        async deleteImage(
            turfId:string,image:string):Promise<IturfDetails|null |any>{
                const details=await turfDetailsModel.updateOne({turfId:new Types.ObjectId(turfId)},{ $pull: { image: image } })
              return details
            }
    
}

export default TurfDetailsRepository