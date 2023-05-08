import { IturfDetails } from "../../interface/turfDetails.interface";
import slotBookingModel from "../../models/slotBooking.model";
import turfModel from "../../models/turf.model"
import turfDetailsModel from "../../models/turfDetails.model"
import { Types } from 'mongoose';

class TurfRepository{


    async getAllTurf(search:string,sports:string,location:string):Promise<object>{
const pipeline=[
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
]


const Location:any={
    $match:{
        location:location
    }
}

const Search:any={
    $match:{
        groundName: { $regex: search, $options: 'i' }
    }
}

const Sports:any= { 
    $match: { 
        sports: { $elemMatch: { $eq: sports } } } }

if(location!==""&&sports===""&&search===""){
pipeline.push(Location)
}
if(sports!==""&&location===""&&search===""){
pipeline.push(Sports)
}
if(search!==""&&location===""&&sports===""){
pipeline.push(Search)
}
if(location!==""&&sports!==""&&search===""){
    pipeline.push(Location)
    pipeline.push(Sports)
}
if(location!==""&&sports===""&&search!==""){
    pipeline.push(Location)
    pipeline.push(Search)
}
if(location===""&&sports!==""&&search!==""){
    pipeline.push(Sports)
    pipeline.push(Search)
}
if(location!==""&&sports!==""&&search!==""){
    pipeline.push(Search)
    pipeline.push(Sports)
    pipeline.push(Location)
}




const details=await turfDetailsModel.aggregate(pipeline)
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

    async availableSports(id:string):Promise<object>{
        const sports = await turfDetailsModel.aggregate([
            {
                $match:{
                    turfId:new Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                  from: "sports",
                  localField: "sports",
                  foreignField: "_id",
                  as: "sportsDetails"
                }
              },
              {
                $unwind: "$sportsDetails"
              },
              {
                $project: {
                  _id: 0,
                //   "sportsDetails.name": 1
                name:"$sportsDetails.name",
                id:"$sportsDetails._id",
                }
              }
        ])
        return sports
    }
    async getSlots(turfId:string):Promise<IturfDetails |null>{
    const data=await turfDetailsModel.findOne({turfId:turfId})
    return data
    }


   
}
export default TurfRepository