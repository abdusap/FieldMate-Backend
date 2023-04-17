import { IturfDetails } from "../../interface/turfDetails.interface";
import turfDetailsModel from "../../models/turfDetails.model";
import { Types } from 'mongoose';

// import  Types  from "mongoose";

class TurfDetailsRepository{
    async addTurfDetails(
        groundName:string,
        website:string,
        sport:Array<string>,
        image:Array<string>
    ):Promise<IturfDetails>{
        

        const sports = sport.map(sport =>new Types.ObjectId(sport));
        const turfDetails = new turfDetailsModel({groundName,website,sports,image})
        await turfDetails.save();
        return turfDetails
    }
}

export default TurfDetailsRepository