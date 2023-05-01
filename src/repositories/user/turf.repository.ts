import turfModel from "../../models/turf.model"
import turfDetailsModel from "../../models/turfDetails.model"
import { Types } from 'mongoose';

class TurfRepository{


    async getAllTurf():Promise<object>{
        const details=await turfDetailsModel.aggregate([
            {$unwind:"$sports"},
            {$lookup:{
                from:"sports",
                localField:"sports",
                foreignField:"_id",
                as:"sports_info"
            }},
            {$unwind:"$sports_info"},
            {$group:{
                _id:"$_id",
                turfId:{$first:"$turfId"},
                amenities:{$first:"$amenities"},
                groundName:{$first:"$groundName"},
                image: { $first: "$image" },
                rules: { $first: "$rules" },
                slots: { $first: "$slots" },
                website: { $first: "$website" },
                sports: { $push: "$sports_info.name" }

            }},{$lookup:{
                from:"turfs",
                localField:"turfId",
                foreignField:"_id",
                as:"info"
            }},
            {$project:{
                turfId:1,
                groundName:1,
                image:1,
                sports:1,
                location: { $arrayElemAt: [ "$info.location", 0 ] }
            }},
            {$lookup:{
                from:"locations",
                localField:"location",
                foreignField:"_id",
                as:"Location"
            }},
            {$project:{
                turfId:1,
                groundName:1,
                image:1,
                sports:1,
                location: { $arrayElemAt: [ "$Location.name", 0 ] }
            }},
        ])
        return details
    }

    async turfDetails(id:string):Promise<object|any>{
        const details=await turfDetailsModel.aggregate([
            {$match:{
                turfId:new Types.ObjectId(id)
            }},  {$unwind:"$sports"},
            {$lookup:{
                from:"sports",
                localField:"sports",
                foreignField:"_id",
                as:"sports_info"
            }},
            {$unwind:"$sports_info"},
            {$group:{
                _id:"$_id",
                turfId:{$first:"$turfId"},
                amenities:{$first:"$amenities"},
                groundName:{$first:"$groundName"},
                image: { $first: "$image" },
                rules: { $first: "$rules" },
                slots: { $first: "$slots" },
                website: { $first: "$website" },
                sports: { $push: "$sports_info.name" }

            }},
        ])
        return details
    }

    async turfData(id:string):Promise<object>{
        const data=await turfModel.aggregate([
            {$match:{
                _id:new Types.ObjectId(id)
            }},{$lookup:{
                from:"locations",
                localField:"location",
                foreignField:"_id",
                as:"location_info"
            }},{
                $project:{
                    location: { $arrayElemAt: [ "$location_info.name", 0 ] },
                    gioCoordinates:1,
                    email:1,
                    mobile:1
                }
            }
        ])
        return data
    }

}
export default TurfRepository